const Router = require('koa-router')
const userController = require('../controllers/user.controller')

const userRouter = new Router()
const controller = new userController()

userRouter.post('/signup', controller.signupUser)
userRouter.post('/login', controller.loginUser)

userRouter.get('/:id', controller.getUser)

module.exports = userRouter
