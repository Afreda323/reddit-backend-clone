import Router from 'koa-router'
import userController from '../controllers/user.controller'

const userRouter = new Router()
const controller = new userController()
userRouter.get('/', controller.getUser)

export default userRouter
