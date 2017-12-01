const Router = require('koa-router')
const userController = require('../controllers/user.controller')

const userRouter = new Router()
const controller = new userController()

userRouter.get('/:id', controller.getUser)
userRouter.post('/signup', controller.signupUser)
userRouter.post('/login', controller.loginUser)


module.exports = userRouter
