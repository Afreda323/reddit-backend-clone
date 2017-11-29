import CommunityService from '../services/community.service'

export default class CommunityController {
  constructor() {
    this.communityService = new CommunityService()
  }
}
