import UserService from '../services/user.service'

export default class UserController {
  constructor() {
    this.userService = new UserService()
  }
  getUser = async ctx => {
    const user = await this.userService.getUser()
    ctx.body = user
  }
}
