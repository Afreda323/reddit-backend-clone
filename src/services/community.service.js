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
  async getCommunity(id) {
    const community = await Community.findOne({ _id: id })
    if (!community) {
      this.err(404, 'Community not found')
    }
    return community
  }
  async search(term, limit = 10, skip = 0) {
    // Query with regex
    const communities = await Community.find(
      { name: new RegExp(`^${term}`, 'i') },
      { name: 1 },
    )
      .skip(skip)
      .limit(limit)
    // Handle doesn't exist
    if (!communities) {
      this.err(404, 'Communities not found')
    }
    // Return desired docs
    return communities
  }
}
