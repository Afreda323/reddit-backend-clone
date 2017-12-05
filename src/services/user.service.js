const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

module.exports = class UserService {
  // Error handling
  err(status, message) {
    const err = new Error()
    err.status = status
    err.message = message
    throw err
  }

  // JWT SIGN
  genToken(id) {
    return jwt.sign({ id }, process.env.SECRET, { expiresIn: '7d' })
  }
  async getUser(id) {
    const user = await User.findOne({ _id: id }, { password: 0 })
    if (!user) {
      this.err(404, "User doesn't exist")
    }
    return user
  }
  async signupUser({ email, username, password, ctx }) {
    // Check for email
    const userByEmail = await User.findOne({ email })
    if (userByEmail) {
      this.err(500, 'Email address taken')
    }
    // check for username
    const userByName = await User.findOne({ username })
    if (userByName) {
      this.err(500, 'Username taken')
    }
    // Hash password
    const hashPassword = await bcrypt.hash(password, 10)
    //Create user
    const newUser = await User.create({
      username,
      email,
      password: hashPassword,
    })
    return newUser._id
  }

  async loginUser({ email, username, password, ctx }) {
    let user
    if (email) {
      // check for email
      user = await User.findOne({ email })
      if (!user) {
        this.err(401, 'User not found')
      }
    } else {
      // check for username
      user = await User.findOne({ username })
      if (!user) {
        this.err(401, 'User not found')
      }
    }
    // Compare passwords
    const checkPassword = await bcrypt.compare(password, user.password)
    if (!checkPassword) {
      this.err(400, 'Invalid password')
    }
    // Id all checks out, pass the token
    return this.genToken(user._id)
  }
}
