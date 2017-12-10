const Comment = require('../models/Comment')
const err = require('../util/err')

module.exports = class CommentService {
  async postComment({ post, author, authorName, text }) {
    const newComment = await Comment.create({
      post,
      author,
      authorName,
      text,
    })
    return newComment
  }
  async getComment(id) {
    const comment = await Comment.findOne({ _id: id })
    if (!comment) {
      err(404, 'Comment not found')
    }
    return comment
  }
}
