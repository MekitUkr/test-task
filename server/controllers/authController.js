const User = require('../models/User')
const bcrypt = require('bcryptjs')

exports.signup = async (req, res) => {
  const { email, password } = req.body
  try {
    const hash = await bcrypt.hash(password, 10)
    const user = await User.create({ email, password: hash })
    req.session.userId = user._id
    res.json({ message: 'Signup successful', user })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.signin = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ error: 'Invalid credentials' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' })

    req.session.userId = user._id
    res.json({ message: 'Signin successful', user })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.signout = async (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.log(err)
      return res.status(500).json({ message: 'Logout failed' })
    }
    res.json({ message: 'Logged out successfully' })
  })
}
