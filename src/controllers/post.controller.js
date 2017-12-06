const { isMongoId } = require('validator')
const jwt = require('jsonwebtoken')
const UserService = require('../services/user.service')
const PostService = require('../services/post.service')
const CommunityService = require('../services/community.service')

module.exports = class PostController {
  constructor() {
    this.postService = new PostService()
    this.userService = new UserService()
    this.communityService = new CommunityService()
    this.createPost = this.createPost.bind(this)
    this.getPost = this.getPost.bind(this)
    this.search = this.search.bind(this)
    this.editPost = this.editPost.bind(this)
  }
  async createPost(ctx) {
    const { community, user, title, content } = ctx.request.body
    // Strip user id off of jwt
    const token = ctx.request.headers.authorization.split('Bearer ')[1]
    const author = jwt.decode(token).id
    // Validate
    ctx.assert(author && isMongoId(author), 'Author invalid')
    ctx.assert(community && isMongoId(community), 'Enter a valid community id')
    ctx.assert(
      title && typeof title === 'string' && title.length > 3,
      'Enter a title',
    )
    ctx.assert(
      content && typeof content === 'string' && content.length > 3,
      'Enter some content',
    )
    // Verify community exists
    const dbCommunity = await this.communityService.getCommunity(community)
    // Get author
    const dbAuthor = await this.userService.getUser(author)
    // Create post
    const post = await this.postService.createPost({
      title: String(title),
      text: String(content),
      community: String(dbCommunity._id),
      author: dbAuthor._id,
      authorName: dbAuthor.username,
    })
    // Update community and user
    dbCommunity.posts.push(post._id)
    dbAuthor.posts.push(post._id)
    await dbCommunity.save()
    await dbAuthor.save()

    // Send response
    ctx.body = post
  }
  async getPostsByAuthor(ctx) {}
  async getPostsByCommunity(ctx) {}
  async search(ctx) {
    const { term, skip } = ctx.query
    // Validate name
    ctx.assert(term && typeof term === 'string', 'Enter a title')
    // Build query
    const q = { term }
    if (skip) {
      q.skip = parseInt(skip)
    }
    // Get and send the post
    const posts = await this.postService.search(q)
    ctx.body = posts
  }
  async getPost(ctx) {
    const { id } = ctx.params
    // Validate
    ctx.assert(id && isMongoId(id), 'Enter a valid ID')
    // Get and send the post
    const post = await this.postService.getPost(id)
    ctx.body = post
  }
  async editPost(ctx) {
    const { id } = ctx.params
    const { title, content } = ctx.request.body
    // Strip user id off of jwt
    const token = ctx.request.headers.authorization.split('Bearer ')[1]
    const author = jwt.decode(token).id
    // Build query
    const q = {}
    if (title) {
      ctx.assert(
        title && typeof title === 'string' && title.length > 3,
        'Enter a title',
      )
      q.title = title
    }
    if (content) {
      ctx.assert(
        content && typeof content === 'string' && content.length > 3,
        'Enter some content',
      )
      q.text = content
    }
    // Fetch user and compare to post author
    const post = await this.postService.getPost(id)
    const user = await this.userService.getUser(author)
    ctx.assert(
      String(post.author) === String(user._id),
      'Not your post',
    )
    // Edit post
    const edit = await this.postService.editPost(post, q)
    // Send back res on success
    ctx.body = edit
  }
  async getUserSubs(ctx) {}
  async downvote(ctx) {}
  async upvote(ctx) {}
  async deletePost(ctx) {}
}
