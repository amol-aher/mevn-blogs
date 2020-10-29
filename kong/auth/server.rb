require 'bundler'
Bundler.setup

require 'sinatra'
require 'openssl'
require 'bcrypt'
require 'securerandom'
require 'jwt'
require 'json'

include BCrypt

require 'sinatra'
require 'mongoid'

Mongoid.load!(File.join(File.dirname(__FILE__), 'config', 'mongoid.yml'))
signing_key_path = File.expand_path("../auth.rsa", __FILE__)
verify_key_path = File.expand_path("../auth.rsa.pub", __FILE__)
set :hmac_secret, 'my$ecretK3y'

class User
  include Mongoid::Document
  field :name, type: String
  field :email, type: String
  field :password, type: String

  validates :name, presence: true
  validates :email, presence: true, uniqueness: true
  validates :password, presence: true
end

class Token
  include Mongoid::Document
  field :email, type: String
  field :random, type: String
end

get '/' do
  {success: true, message: 'Welcome to BookList!'}.to_json
end

post '/create-user' do
  if params.present?
    if params[:email].present? && params[:password].present? && params[:name].present?
      user = User.new(email: params[:email], name: params[:name], password: BCrypt::Password.create(params[:password], cost: 12))
      if user.save
        puts "User: #{user}"
        {success: 'User created'}.to_json
      else
        {error: user.errors.full_messages}.to_json
      end
    else
      {error: 'Params incorrect'}.to_json
    end
  else
    {error: 'Params incorrect'}.to_json
  end
end

helpers do
  def authenticate(email, password)
    user = User.where(email: email).first
    if user == nil
      return false
    else
      if BCrypt::Password.new(user.password) == password
        return true
      else
        return false
      end
    end
  end

  def get_token
    token = request.env['HTTP_ACCESS_TOKEN']
    if token
      return token
    end
    return nil
  end

  def authorized?
    @token = get_token
    begin
      payload, header = JWT.decode @token, settings.hmac_secret, true, { algorithm: 'HS256' }
      @exp = header['exp']
      if @exp == nil
        return {error: 'Access token do not have expiry'}
      end
      
      if Time.now > @exp
        return {error: 'Access token expired'}
      end

      if Token.where(random: payload['random']).first == nil
        return {error: 'Only one login per user'}
      end

      user_id = payload['user_id']
      return {success: "Access allowed till: #{@exp}", user_id: user_id}
    rescue JWT::DecodeError => e
      puts "Error: #{e}"
    end
  end
end

post '/login' do
  if authenticate(params[:email], params[:password])
    headers = {
      exp: Time.now + 300
    }
    user = User.where(email: params[:email]).first
    randy = SecureRandom.base64
    existingToken = Token.where(email: user.email).first
    if existingToken
      existingToken.destroy
    end
    only_one_token = Token.new(email: user.email, random: randy)
    only_one_token.save!
    @token = JWT.encode({user_id: user._id.to_s, random: randy}, settings.hmac_secret, 'HS256', headers)
    {token: @token}.to_json
  else
    {error: 'Access denied'}.to_json
  end
end

get '/me' do
  authorized?.to_json
end