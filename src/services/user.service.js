const bcrypt = require('bcrypt')
const User = require('../models/User')

module.exports = class UserService {
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
}
