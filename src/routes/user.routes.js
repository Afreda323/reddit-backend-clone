import Router from 'koa-router'

const userRouter = new Router()

userRouter.get('/', async ctx => {
  ctx.body = 'Hello World'
})

export default userRouter
