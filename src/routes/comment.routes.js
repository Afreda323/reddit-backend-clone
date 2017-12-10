const Router = require('koa-router')
const jwt = require('koa-jwt')
const CommentController = require('../controllers/comment.controller')

const commentRouter = new Router()
const controller = new CommentController()

commentRouter.get('/post/:id', controller.getCommentsByPost)
commentRouter.get('/author/:id', controller.getCommentsByAuthor)
commentRouter.get('/:id', controller.getComment)

//Auth routes
commentRouter.use(jwt({ secret: process.env.SECRET }))

commentRouter.put('/:id', controller.editComment)
commentRouter.put('/:id/down', controller.downvote)
commentRouter.put('/:id/:up', controller.upvote)

commentRouter.delete('/:id', controller.deleteComment)

commentRouter.post('/', controller.postComment)
commentRouter.post('/:id', controller.reply)

module.exports = commentRouter
