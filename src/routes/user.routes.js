const Router = require('koa-router')
const jwt = require('koa-jwt')
const userController = require('../controllers/user.controller')

const userRouter = new Router()
const controller = new userController()

userRouter.post('/signup', controller.signupUser)
userRouter.post('/login', controller.loginUser)

// Protect next routes
userRouter.use(jwt({ secret: process.env.SECRET }))

userRouter.get('/secrets', ctx => {
  ctx.body = 'you made it'
})

module.exports = userRouter
