import Router from 'koa-router'
import CommunityController from '../controllers/community.controller'

const communityRouter = new Router()
const controller = new CommunityController()

communityRouter.post('/', controller.createCommunity)

communityRouter.get('/:id', controller.getCommunity)
communityRouter.get('/search/:id', controller.search)

communityRouter.put('/:id/sub', controller.subscribe)
communityRouter.put('/:id/unsub', controller.createCommunity)
communityRouter.put('/:id', controller.editCommunity)

communityRouter.delete('/', controller.deleteCommunity)

export default communityRouter
