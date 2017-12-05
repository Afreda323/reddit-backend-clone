const mongoose = require('mongoose')
const { Schema } = require('mongoose')
const { ObjectId } = Schema.Types

const CommunitySchema = new Schema({
  name: {
    type: String,
    lowercase: true,
    trim: true,
    unique: true,
    required: true,
  },
  author: {
    type: ObjectId,
    required: true,
  },
  about: {
    type: String,
    default: '',
  },
  subscribers: {
    type: [ObjectId],
    default: [],
  },
  posts: {
    type: [ObjectId],
    default: [],
  },
  avatarUrl: { type: String },
})

const Community = mongoose.model('Community', CommunitySchema)

module.exports = Community
