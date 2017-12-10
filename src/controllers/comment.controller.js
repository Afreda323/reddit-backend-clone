const jwt = require('jsonwebtoken')
const { isMongoId } = require('validator')
const CommentService = require('../services/comment.service')
const PostService = require('../services/post.service')
const UserService = require('../services/user.service')

module.exports = class CommentController {
  constructor() {
    this.commentService = new CommentService()
    this.userService = new UserService()
    this.postService = new PostService()
    this.postComment = this.postComment.bind(this)
    this.getComment = this.getComment.bind(this)
    this.getCommentsByAuthor = this.getCommentsByAuthor.bind(this)
    this.getCommentsByPost = this.getCommentsByPost.bind(this)
  }
  async getComment(ctx) {
    const { id } = ctx.params
    // Validate
    ctx.assert(id && isMongoId(id), 'Enter a valid ID')
    // Get and send the post
    const comment = await this.commentService.getComment(id)
    ctx.body = comment
  }
  async postComment(ctx) {
    const { text, post } = ctx.request.body
    // Strip user id off of jwt
    const token = ctx.request.headers.authorization.split('Bearer ')[1]
    const author = jwt.decode(token).id
    // Validate
    ctx.assert(author && isMongoId(author), 'Author invalid')
    ctx.assert(post && isMongoId(post), 'Enter a valid post id')
    ctx.assert(
      text && typeof text === 'string' && text.length > 3,
      'Enter some content'
    )
    // Verify post exists
    const dbPost = await this.postService.getPost(post)
    // Get author
    const dbAuthor = await this.userService.getUser(author)
    // Create comment
    const comment = await this.commentService.postComment({
      text: String(text),
      author: dbAuthor._id,
      authorName: dbAuthor.username,
      post: post,
    })
    // Update post and user
    dbPost.comments.push(comment._id)
    dbAuthor.comments.push(comment._id)
    await dbPost.save()
    await dbAuthor.save()

    // Send response
    ctx.body = post
  }
  async getCommentsByAuthor(ctx) {
    const { id } = ctx.params
    const { skip } = ctx.query
    // Build query
    const q = {}
    if (skip) {
      q.skip = parseInt(skip)
    }
    // Validate
    ctx.assert(id && isMongoId(id), 'Enter a valid ID')
    // Get and send the post
    const comments = await this.commentService.getComments({ author: id }, q)
    ctx.body = comments
  }
  async getCommentsByPost(ctx) {
    const { id } = ctx.params
    const { skip } = ctx.query
    // Build query
    const q = {}
    if (skip) {
      q.skip = parseInt(skip)
    }
    // Validate
    ctx.assert(id && isMongoId(id), 'Enter a valid ID')
    // Get and send the post
    const comments = await this.commentService.getComments({ post: id }, q)
    ctx.body = comments
  }
  // TODO
  async editComment(ctx) {}
  async downvote(ctx) {}
  async upvote(ctx) {}
  async deleteComment(ctx) {}
  async reply(ctx) {}
}
