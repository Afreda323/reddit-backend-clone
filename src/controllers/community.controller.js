const CommunityService = require('../services/community.service')
const { isAlphanumeric } = require('validator')
const jwt = require('jsonwebtoken')

module.exports = class CommunityController {
  constructor() {
    this.communityService = new CommunityService()
    this.createCommunity = this.createCommunity.bind(this)
  }
  async createCommunity(ctx) {
    const { name, about } = ctx.request.body
    const token = ctx.request.headers.authorization.split('Bearer ')[1]
    const author = jwt.decode(token).id
    ctx.assert(isAlphanumeric(name), 'Enter a valid name')
    const created = await this.communityService.createCommunity({
      about,
      name,
      author,
    })
    ctx.body = { success: true, _id: created._id, author: created.author }
  }
  async getCommunity(ctx) {}
  async search(ctx) {}
  async subscribe(ctx) {}
  async editCommunity(ctx) {}
  async deleteCommunity(ctx) {}
}
