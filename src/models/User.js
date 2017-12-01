const mongoose = require('mongoose')
const { Schema } = require('mongoose')
const { ObjectId } = mongoose.Types

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      trim: true,
    },
    password: String,
    emailAddress: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
    },
    posts: [ObjectId],
    comments: [ObjectId],
    subscriptions: [ObjectId],
  },
  { timestamps: true },
)

const User = mongoose.model('User', UserSchema)

module.exports = User
