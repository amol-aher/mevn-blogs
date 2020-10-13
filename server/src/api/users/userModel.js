const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
  
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  
  email: {
    type: String,
    required: [true, 'Email is required']
  },
  
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    },    
  ]
})

userSchema.pre('save', async function(next) {
  const user = this
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }
  next()
})

userSchema.methods.generateAuthToken = async function() {
  const user = this
  const token = jwt.sign({_id: user._id, name: user.name, email: user.email}, 'secret')
  if ( user.tokens.length >= 2 ) {
    user.tokens.pop()
  }
  user.tokens.push({token})
  console.log(user.tokens.length)
  await user.save()
  return token
}

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email })
  if (!user) {
    throw new Error({error: 'Invalid login details'})
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password)
  if (!isPasswordMatch) {
    throw new Error({error: 'Invalid login details'})
  }
  return user
}

const User = mongoose.model('User', userSchema)
module.exports = User