import Router from 'koa-router'
import PostController from '../controllers/post.controller'

const postRouter = new Router()
const controller = new PostController()

postRouter.post('/', controller.createPost)

postRouter.get('/author/:id', controller.getPostsByAuthor)
postRouter.get('/community/:id', controller.getPostsByCommunity)
postRouter.get('/search/:term', controller.search)
postRouter.get('/:id', controller.getPost)
postRouter.get('/user/:id', controller.getUserSubs)

postRouter.put('/:id/down', controller.downvote)
postRouter.put('/:id/:up', controller.upvote)
postRouter.put('/:id', controller.editPost)

postRouter.delete('/:id', controller.deletePost)

export default postRouter
