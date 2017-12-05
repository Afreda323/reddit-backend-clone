const mongoose = require('mongoose')
const { Schema } = require('mongoose')
const { ObjectId } = Schema.Types

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      trim: true,
    },
    password: String,
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
    },
    posts: {
      type: [ObjectId],
      default: [],
    },
    comments: {
      type: [ObjectId],
      default: [],
    },
    subscriptions: {
      type: [ObjectId],
      default: [],
    },
    communities: {
      type: [ObjectId],
      default: [],
    }
  },
  { timestamps: true },
)

const User = mongoose.model('User', UserSchema)

module.exports = User
