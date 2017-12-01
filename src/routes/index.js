const Koa = require('koa')
const Router = require('koa-router')
const userRouter = require('./user.routes')
const postRouter = require('./post.routes')
const communityRouter = require('./community.routes')
const commentRouter = require('./comment.routes')

const api = new Koa()
const router = new Router()

router.use('/user', userRouter.routes())
router.use('/post', postRouter.routes())
router.use('/community', communityRouter.routes())
router.use('/comment', commentRouter.routes())

api.use(router.routes())

module.exports = api
