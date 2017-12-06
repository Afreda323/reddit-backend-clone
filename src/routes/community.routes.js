const Router = require('koa-router')
const jwt = require('koa-jwt')
const CommunityController = require('../controllers/community.controller')

const communityRouter = new Router()
const controller = new CommunityController()


communityRouter.get('/search', controller.search)
communityRouter.get('/:id', controller.getCommunity)

//Auth routes
communityRouter.use(jwt({ secret: process.env.SECRET }))

communityRouter.post('/', controller.createCommunity)
communityRouter.put('/:id/sub', controller.subscribe)
communityRouter.put('/:id/unsub', controller.createCommunity)
communityRouter.put('/:id', controller.editCommunity)

communityRouter.delete('/:id', controller.deleteCommunity)

module.exports = communityRouter
