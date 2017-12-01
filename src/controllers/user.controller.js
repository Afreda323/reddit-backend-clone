const UserService = require('../services/user.service')

module.exports = class UserController {
  constructor() {
    this.userService = new UserService()
  }
  async signupUser(ctx) {}
  async loginUser(ctx) {}
  async getUser(ctx) {
    ctx.body = ctx.params.id
  }
}
