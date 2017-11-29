import Router from 'koa-router'
import PostController from '../controllers/post.controller'

const postRouter = new Router()
const controller = new PostController()

export default postRouter
