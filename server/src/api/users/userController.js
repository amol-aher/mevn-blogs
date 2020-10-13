const User = require('./userModel')

exports.registerNewUser = async (req, res) => {
  try {
    let isUser = await User.find({ email: req.body.email })
    if ( isUser.length >= 1 ) {
      return res.status(409).json({
        message: 'Email already exists'
      })
    }
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    })
    let data = await user.save()
    const token = await user.generateAuthToken()
    res.status(201).json({ data, token })
  } catch( error ) {
    return res.status(400).json({ error: error })
  }
}

exports.loginUser = async (req, res) => {
  try {
    const email = req.body.email
    const password = req.body.password
    const user = await User.findByCredentials(email, password)
    if (!user) {
      return status(401).json({ error: 'Login failed' })
    }
    const token = await user.generateAuthToken()
    res.status(201).json({ user, token })
  } catch( error ) {
    return res.status(400).json({ error: error })
  }
}

exports.getUserDetails = async (req, res) => {
  await res.json(req.userData)
}
