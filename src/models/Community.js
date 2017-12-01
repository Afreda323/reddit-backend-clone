const mongoose = require('mongoose')
const { Schema } = require('mongoose')
const { ObjectId } = mongoose.Types

const CommunitySchema = new Schema({
  name: {
    type: String,
    lowercase: true,
    trim: true,
    unique: true,
  },
  about: {
    type: String,
    subscribers: [ObjectId],
  },
  avatarUrl: {
    type: String,
  },
})

const Community = mongoose.model('Community', CommunitySchema)

module.exports = Community
