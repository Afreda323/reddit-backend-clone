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
  async search({ term, limit = 10, skip = 0 }) {
    // Query with regex
    const posts = await Post.find(
      { title: new RegExp(term, 'i') },
      { title: 1 },
    )
      .skip(skip)
      .limit(limit)
      .sort({updatedAt: -1})

    // Handle doesn't exist
    if (!posts) {
      err(404, 'Posts not found')
    }
    // Return desired docs
    return posts
  }
  async editPost(post, { title, text }) {
    if (title) {
      post.title = title
    }
    if (text) {
      post.text = text
    }
    const updated = await post.save()
    return updated
  }
  async deletePost(post) {
    const deleted = await post.remove()
    return deleted
  }
  async getPosts(query, { skip = 0, limit = 10 }) {
    // Query with regex
    const posts = await Post.find(query)
      .skip(skip)
      .limit(limit)
      .sort({updatedAt: -1})

    // Handle doesn't exist
    if (!posts) {
      err(404, 'Posts not found')
    }
    // Return desired docs
    return posts
  }
}
