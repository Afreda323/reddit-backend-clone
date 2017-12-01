const CommentService = require('../services/comment.service')

module.exports = class CommentController {
  constructor() {
    this.commentService = new CommentService()
  }
  async getComment(ctx) {}
  async getCommentsByPost(ctx) {}
  async getPostsByAuthor(ctx) {}
  async getCommentsByAuthor(ctx) {}
  async editComment(ctx) {}
  async downvote(ctx) {}
  async upvote(ctx) {}
  async deleteComment(ctx) {}
  async postComment(ctx) {}
  async reply(ctx) {}
}
