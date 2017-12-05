const CommunityService = require('../services/community.service')
const UserService = require('../services/user.service')
const { isAlphanumeric, isMongoId } = require('validator')
const jwt = require('jsonwebtoken')

module.exports = class CommunityController {
  constructor() {
    this.communityService = new CommunityService()
    this.userService = new UserService()
    this.createCommunity = this.createCommunity.bind(this)
    this.getCommunity = this.getCommunity.bind(this)
    this.search = this.search.bind(this)
  }
  async createCommunity(ctx) {
    const { name, about } = ctx.request.body
    // Strip user id off of jwt
    const token = ctx.request.headers.authorization.split('Bearer ')[1]
    const author = jwt.decode(token).id
    // Validate name
    ctx.assert(isAlphanumeric(name), 'Enter a valid name')
    // Create communtiy
    const created = await this.communityService.createCommunity({
      about,
      name,
      author,
    })
    // Fetch user and add new community
    const user = await this.userService.getUser(author)
    user.communities.push(created._id)
    await user.save()
    // Send back res on success
    ctx.body = { success: true, _id: created._id, author: created.author }
  }
  async getCommunity(ctx) {
    const { id } = ctx.params
    // Validate
    ctx.assert(isMongoId(id), 'Enter a valid ID')
    // Get and send the community
    const community = await this.communityService.getCommunity(id)
    ctx.body = community
  }
  async search(ctx) {
    const { term } = ctx.params
    // Validate name
    ctx.assert(isAlphanumeric(term), 'Enter a valid string')
    // Get and send the community
    const communities = await this.communityService.search(term.toLowerCase())
    ctx.body = communities
  }
  async subscribe(ctx) {}
  async editCommunity(ctx) {}
  async deleteCommunity(ctx) {}
}
