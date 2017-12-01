const mongoose = require('mongoose')
const { Schema } = require('mongoose')
const { ObjectId } = mongoose.Types

const PostSchema = new Schema(
  {
    type: {
      type: String,
      enum: ['link', 'text'],
    },
    community: ObjectId,
    title: { type: String },
    text: { type: String },
    link: { type: String },
    comments: [ObjectId],
    author: { type: ObjectId },
    authorName: { type: String },
    upvotes: [ObjectId],
    downvotes: [ObjectId],
  },
  { timestamps: true },
)

const Post = mongoose.model('Post', PostSchema)

module.exports = Post
