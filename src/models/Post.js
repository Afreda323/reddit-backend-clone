const mongoose = require('mongoose')
const { Schema } = require('mongoose')
const { ObjectId } = Schema.Types

const PostSchema = new Schema(
  {
    community: ObjectId,
    title: { type: String },
    text: { type: String },
    comments: {
      type: [ObjectId],
      default: [],
    },
    author: { type: ObjectId },
    authorName: { type: String },
    upvotes: {
      type: [ObjectId],
      default: [],
    },
    downvotes: {
      type: [ObjectId],
      default: [],
    },
  },
  { timestamps: true },
)

const Post = mongoose.model('Post', PostSchema)

module.exports = Post
