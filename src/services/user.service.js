const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

module.exports = class UserService {
  // JWT SIGN
  genToken(id) {
    return jwt.sign({ id }, process.env.SECRET, { expiresIn: '7d' })
  }

  async signupUser({ email, username, password, ctx }) {
    // Check for email
    const userByEmail = await User.findOne({ email })
    if (userByEmail) {
      ctx.throw(500, 'Email address taken')
    }
    // check for username
    const userByName = await User.findOne({ username })
    if (userByName) {
      ctx.throw(500, 'Username taken')
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

  async loginUser({ email, username, password }) {
    let user
    if (email) {
      // check for email
      user = await User.findOne({ email })
      if (!user) {
        ctx.throw(401, 'User not found')
      }
    } else {
      // check for username
      user = await User.findOne({ username })
      if (!user) {
        ctx.throw(401, 'User not found')
      }
    }

    const token = this.genToken(user._id)
    return token
  }
}
