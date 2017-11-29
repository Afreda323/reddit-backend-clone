import Router from 'koa-router'
import CommentController from '../controllers/comment.controller'

const commentRouter = new Router()
const controller = new CommentController()

export default commentRouter
