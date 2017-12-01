const PostService = require('../services/post.service')

module.exports = class PostController {
  constructor() {
    this.postService = new PostService()
  }
  async createPost(ctx) {}
  async getPostsByAuthor(ctx) {}
  async getPostsByCommunity(ctx) {}
  async search(ctx) {}
  async getPost(ctx) {}
  async getUserSubs(ctx) {}
  async downvote(ctx) {}
  async upvote(ctx) {}
  async editPost(ctx) {}
  async deletePost(ctx) {}
}
