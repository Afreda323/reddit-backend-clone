const Post = require('../models/Post')
const err = require('../util/err')

module.exports = class PostService {
  async createPost({ community, author, authorName, title, text }) {
    const newPost = await Post.create({
      community,
      author,
      authorName,
      title,
      text,
    })
    return newPost
  }
  async getPost(id) {
    const post = await Post.findOne({ _id: id })
    if (!post) {
      err(404, 'Post not found')
    }
    return post
  }
}
