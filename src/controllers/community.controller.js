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
    this.editCommunity = this.editCommunity.bind(this)
    this.deleteCommunity = this.deleteCommunity.bind(this)
    this.subscribe = this.subscribe.bind(this)
    this.unsubscribe = this.unsubscribe.bind(this)
  }
  async createCommunity(ctx) {
    const { name, about } = ctx.request.body
    // Strip user id off of jwt
    const token = ctx.request.headers.authorization.split('Bearer ')[1]
    const author = jwt.decode(token).id
    // Validate name
    ctx.assert(name && isAlphanumeric(name), 'Enter a valid name')
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
    ctx.assert(id && isMongoId(id), 'Enter a valid ID')
    // Get and send the community
    const community = await this.communityService.getCommunity(id)
    ctx.body = community
  }
  async search(ctx) {
    const { term, skip } = ctx.query
    // Validate name
    ctx.assert(term && isAlphanumeric(term), 'Enter a valid string')
    // Build query
    const q = { term: term.toLowerCase() }
    if (skip) {
      q.skip = parseInt(skip)
    }
    // Get and send the community
    const communities = await this.communityService.search(q)
    ctx.body = communities
  }
  async editCommunity(ctx) {
    const { id } = ctx.params
    const { name, about } = ctx.request.body
    // Strip user id off of jwt
    const token = ctx.request.headers.authorization.split('Bearer ')[1]
    const author = jwt.decode(token).id
    // Build query
    const q = {}
    // Validate name
    if (name) {
      ctx.assert(name && isAlphanumeric(name), 'Enter a valid name')
      // Make sure name isnt taken
      const check = await this.communityService.checkDoesntExist(name)
      console.log(check)
      ctx.assert(check, 'Name taken')
      q.name = name
    }
    if (about) {
      ctx.assert(typeof about === 'string', 'Enter a valid description')
      q.about = about
    }
    // Fetch user and compare to community author
    const community = await this.communityService.getCommunity(id)
    const user = await this.userService.getUser(author)
    ctx.assert(
      String(community.author) === String(user._id),
      'Not your community',
    )
    // Create communtiy
    const created = await this.communityService.editCommunity(community, q)
    // Send back res on success
    ctx.body = created
  }
  async deleteCommunity(ctx) {
    const { id } = ctx.params
    ctx.assert(id && isMongoId(id), 'Enter a valid id')
    // Strip user id off of jwt
    const token = ctx.request.headers.authorization.split('Bearer ')[1]
    const author = jwt.decode(token).id
    // Fetch user and compare to community author
    const community = await this.communityService.getCommunity(id)
    const user = await this.userService.getUser(author)
    ctx.assert(String(community.author) === String(user._id), 'Not your post')
    // Delete community
    const deleted = await this.communityService.deleteCommunity(community)
    // Send back res on success
    ctx.body = deleted
  }
  async subscribe(ctx) {
    const { id } = ctx.params
    // Validate
    ctx.assert(id && isMongoId(id), 'Enter a valid ID')
    // Get Community
    const community = await this.communityService.getCommunity(id)
    // Strip user id off of jwt
    const token = ctx.request.headers.authorization.split('Bearer ')[1]
    const author = jwt.decode(token).id
    // Fetch user and make sure exists
    const user = await this.userService.getUser(author)
    // Verify that user is subscribed
    ctx.assert(
      user.subscriptions.indexOf(community._id) === -1,
      'User subscribed',
    )
    const updated = await this.communityService.subscribe(community, user._id)
    // Update user subscriptions
    user.subscriptions.push(updated._id)
    await user.save()
    ctx.body = updated
  }
  async unsubscribe(ctx) {
    const { id } = ctx.params
    // Validate
    ctx.assert(id && isMongoId(id), 'Enter a valid ID')
    // Get Community
    const community = await this.communityService.getCommunity(id)
    // Strip user id off of jwt
    const token = ctx.request.headers.authorization.split('Bearer ')[1]
    const author = jwt.decode(token).id
    // Fetch user and make sure exists
    const user = await this.userService.getUser(author)
    // Verify that user is subscribed
    ctx.assert(
      user.subscriptions.indexOf(community._id) !== -1,
      'User not subscribed',
    )
    const updated = await this.communityService.unsubscribe(community, user._id)
    // Update user subscriptions
    user.subscriptions.pull(updated._id)
    await user.save()

    ctx.body = updated
  }
}
