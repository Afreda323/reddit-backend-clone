import CommunityService from '../services/community.service'

export default class CommunityController {
  constructor() {
    this.communityService = new CommunityService()
  }
  createCommunity = async ctx => {}
  getCommunity = async ctx => {}
  search = async ctx => {}
  subscribe = async ctx => {}
  createCommunity = async ctx => {}
  editCommunity = async ctx => {}
  deleteCommunity = async ctx => {}
}
