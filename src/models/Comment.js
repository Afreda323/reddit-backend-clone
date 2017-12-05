const mongoose = require('mongoose')
const { Schema } = require('mongoose')
const { ObjectId } = Schema.Types

const CommentSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    comments: {
      type: [ObjectId],
      default: [],
    },
    author: {
      type: ObjectId,
      required: true,
    },
    authorName: {
      type: String,
      required: true,
    },
    upvotes: {
      type: [ObjectId],
      default: [],
    },
    downvotes: {
      type: [ObjectId],
      default: [],
    },
    replies: [this],
    post: {
      type: ObjectId,
      required: true,
    },
  },
  { timestamps: true },
)

const Comment = mongoose.model('Comment', CommentSchema)

module.exports = Comment
