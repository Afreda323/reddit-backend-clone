const Community = require('../models/Community')

module.exports = class CommunityService {
  // Error handling
  err(status, message) {
    const err = new Error()
    err.status = status
    err.message = message
    throw err
  }
  async createCommunity({ name, about, author }) {
    const existing = await Community.findOne({ name })
    if (existing) {
      this.err(500, 'Community name taken')
    }
    const newCommunty = await Community.create({ name, about, author })
    return newCommunty
  }
}
