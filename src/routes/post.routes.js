const Router = require('koa-router')
const jwt = require('koa-jwt')

const PostController = require('../controllers/post.controller')

const postRouter = new Router()
const controller = new PostController()

postRouter.get('/author/:id', controller.getPostsByAuthor)
postRouter.get('/community/:id', controller.getPostsByCommunity)
postRouter.get('/search/', controller.search)
postRouter.get('/:id', controller.getPost)
postRouter.get('/user/:id', controller.getUserSubs)

//Auth routes
postRouter.use(jwt({ secret: process.env.SECRET }))

postRouter.post('/', controller.createPost)
postRouter.put('/:id/down', controller.downvote)
postRouter.put('/:id/:up', controller.upvote)
postRouter.put('/:id', controller.editPost)

postRouter.delete('/:id', controller.deletePost)

module.exports = postRouter
