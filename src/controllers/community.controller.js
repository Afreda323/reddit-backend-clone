const CommunityService = require('../services/community.service')

module.exports = class CommunityController {
  constructor() {
    this.communityService = new CommunityService()
  }
  async createCommunity(ctx) {}
  async getCommunity(ctx) {}
  async search(ctx) {}
  async subscribe(ctx) {}
  async createCommunity(ctx) {}
  async editCommunity(ctx) {}
  async deleteCommunity(ctx) {}
}
