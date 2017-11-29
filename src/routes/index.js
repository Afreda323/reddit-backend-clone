import Koa from 'koa'
import Router from 'koa-router'
import userRouter from './user.routes'
import postRouter from './post.routes'
import communityRouter from './community.routes'
import commentRouter from './comment.routes'

const api = new Koa()
const router = new Router()

router.use('/user', userRouter.routes())
router.use('/post', postRouter.routes())
router.use('/community', communityRouter.routes())
router.use('/comment', commentRouter.routes())

api.use(router.routes())

export default api
