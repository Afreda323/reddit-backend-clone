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
  async getComments(query, { skip = 0, limit = 10 }) {
    // Query with regex
    const comments = await Comment.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ updatedAt: -1 })

    // Handle doesn't exist
    if (!comments) {
      err(404, 'Comments not found')
    }
    // Return desired docs
    return comments
  }
  async editComment(comment, text) {
    comment.text = text
    const updated = await comment.save()
    return updated
  }
}
