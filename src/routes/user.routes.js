import Router from 'koa-router'
import userController from '../controllers/user.controller'

const userRouter = new Router()
const controller = new userController()

userRouter.post('/signup', controller.signupUser)
userRouter.post('/login', controller.loginUser)

userRouter.get('/:id', controller.getUser)

export default userRouter
