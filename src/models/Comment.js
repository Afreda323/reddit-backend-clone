const mongoose = require('mongoose')
const { Schema } = require('mongoose')
const { ObjectId } = Schema.Types

const CommentSchema = new Schema(
  {
    text: { type: String },
    comments: [ObjectId],
    author: { type: ObjectId },
    authorName: { type: String },
    upvotes: [ObjectId],
    downvotes: [ObjectId],
    replies: [this],
    post: { type: ObjectId },
  },
  { timestamps: true },
)

const Comment = mongoose.model('Comment', CommentSchema)

module.exports = Comment
