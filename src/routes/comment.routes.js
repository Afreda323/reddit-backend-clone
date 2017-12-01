const Router = require('koa-router')
const CommentController = require('../controllers/comment.controller')

const commentRouter = new Router()
const controller = new CommentController()

commentRouter.get('/:id', controller.getComment)
commentRouter.get('/post/:id', controller.getCommentsByPost)
commentRouter.get('/author/:id', controller.getPostsByAuthor)
commentRouter.get('/author/:id', controller.getCommentsByAuthor)

commentRouter.put('/:id', controller.editComment)
commentRouter.put('/:id/down', controller.downvote)
commentRouter.put('/:id/:up', controller.upvote)

commentRouter.delete('/:id', controller.deleteComment)

commentRouter.post('/', controller.postComment)
commentRouter.post('/:id', controller.reply)

module.exports = commentRouter
