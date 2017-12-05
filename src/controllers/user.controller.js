const { isEmail, isAlphanumeric } = require('validator')
const UserService = require('../services/user.service')

module.exports = class UserController {
  constructor() {
    this.userService = new UserService()
    this.signupUser = this.signupUser.bind(this)
    this.loginUser = this.loginUser.bind(this)
    this.getUser = this.getUser.bind(this)
  }
  async signupUser(ctx) {
    const { email, username, password } = ctx.request.body
    // Validation assertions
    ctx.assert(email && isEmail(email), 'Enter a valid email address')
    ctx.assert(password && password.length >= 6, 'Enter a valid password')
    ctx.assert(username && isAlphanumeric(username), 'Enter a valid username')

    // Pass data to be saved to mongo
    const userId = await this.userService.signupUser({
      email,
      username,
      password,
    })
    // On success return user._id
    ctx.body = userId
  }
  async loginUser(ctx) {
    const { email, username, password } = ctx.request.body

    // Validation assertions
    ctx.assert(password && password.length >= 6, 'Enter a valid password')
    ctx.assert(
      (email && isEmail(email)) || (username && isAlphanumeric(username)),
      'Enter a valid email address or username',
    )

    const token = await this.userService.loginUser({
      username,
      email,
      password,
    })

    ctx.body = { token }
  }
  async getUser(ctx) {
    const { id } = ctx.params
    console.log(id)
    const user = await this.userService.getUser(id)
    ctx.body = user
  }
}
