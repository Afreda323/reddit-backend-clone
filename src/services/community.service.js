const Community = require('../models/Community')
const err = require('../util/err')

module.exports = class CommunityService {
  async checkDoesntExist(name) {
    const existing = await Community.findOne({ name })
    return !existing
  }
  async createCommunity({ name, about, author }) {
    const existing = await Community.findOne({ name })
    if (existing) {
      err(500, 'Community name taken')
    }
    const newCommunty = await Community.create({ name, about, author })
    return newCommunty
  }
  async getCommunity(id) {
    const community = await Community.findOne({ _id: id })
    if (!community) {
      err(404, 'Community not found')
    }
    return community
  }
  async search({ term, limit = 10, skip = 0 }) {
    // Query with regex
    const communities = await Community.find(
      { name: new RegExp(`^${term}`, 'i') },
      { name: 1 },
    )
      .skip(skip)
      .limit(limit)

    // Handle doesn't exist
    if (!communities) {
      err(404, 'Communities not found')
    }
    // Return desired docs
    return communities
  }
  async editCommunity(community, { name, about }) {
    if (name) {
      community.name = name
    }
    if (about) {
      community.about = about
    }
    const updated = await community.save()
    return updated
  }
  async deleteCommunity(community) {
    const deleted = await community.remove()
    return deleted
  }
  async subscribe(community, user) {
    community.subscribers.push(user)
    const updated = await community.save()
    return updated
  }
  async unsubscribe(community, user) {
    community.subscribers.pull(user)
    const updated = await community.save()
    return updated
  }
}
