import Router from 'koa-router'
import CommunityController from '../controllers/community.controller'

const communityRouter = new Router()
const controller = new CommunityController()

export default communityRouter
