import UserService from '../services/user.service'

export default class UserController {
  constructor() {
    this.userService = new UserService()
  }
  signupUser = async ctx => {}
  loginUser = async ctx => {}
  getUser = async ctx => {}
}
