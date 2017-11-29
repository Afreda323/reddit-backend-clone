import Koa from 'koa'
import Router from 'koa-router'
import userRouter from './user.routes'

const api = new Koa()
const router = new Router()

router.use('/user', userRouter.routes())
api.use(router.routes())

export default api
