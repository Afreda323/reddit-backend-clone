const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const err = require('../util/err')

module.exports = class UserService {
  // JWT SIGN
  genToken(id) {
    return jwt.sign({ id }, process.env.SECRET, { expiresIn: '7d' })
  }
  async getUser(id) {
    const user = await User.findOne({ _id: id }, { password: 0 })
    if (!user) {
      err(404, "User doesn't exist")
    }
    return user
  }
  async signupUser({ email, username, password, ctx }) {
    // Check for email
    const userByEmail = await User.findOne({ email })
    if (userByEmail) {
      err(500, 'Email address taken')
    }
    // check for username
    const userByName = await User.findOne({ username })
    if (userByName) {
      err(500, 'Username taken')
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
        err(401, 'User not found')
      }
    } else {
      // check for username
      user = await User.findOne({ username })
      if (!user) {
        err(401, 'User not found')
      }
    }
    // Compare passwords
    const checkPassword = await bcrypt.compare(password, user.password)
    if (!checkPassword) {
      err(400, 'Invalid password')
    }
    // Id all checks out, pass the token
    return this.genToken(user._id)
  }
}
