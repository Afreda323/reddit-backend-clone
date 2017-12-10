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
    this.upvote = this.upvote.bind(this)
    this.downvote = this.downvote.bind(this)
    this.editComment = this.editComment.bind(this)
    this.deleteComment = this.deleteComment.bind(this)
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
  async downvote(ctx) {
    const { id } = ctx.params
    // Strip user id off of jwt
    const token = ctx.request.headers.authorization.split('Bearer ')[1]
    const author = jwt.decode(token).id
    // Fetch the comment
    const comment = await this.commentService.getComment(id)
    // Remove user from both up and downs,
    // then add it to downs
    comment.upvotes.pull(author)
    comment.downvotes.pull(author)
    comment.downvotes.push(author)
    const res = await comment.save()
    ctx.body = res
  }
  async upvote(ctx) {
    const { id } = ctx.params
    // Strip user id off of jwt
    const token = ctx.request.headers.authorization.split('Bearer ')[1]
    const author = jwt.decode(token).id
    // Fetch the comment
    const comment = await this.commentService.getComment(id)
    // Remove user from both up and downs,
    // then add it to downs
    comment.upvotes.pull(author)
    comment.downvotes.pull(author)
    comment.upvotes.push(author)
    const res = await comment.save()
    ctx.body = res
  }
  async editComment(ctx) {
    const { id } = ctx.params
    const { text } = ctx.request.body
    // Strip user id off of jwt
    const token = ctx.request.headers.authorization.split('Bearer ')[1]
    const author = jwt.decode(token).id
    // Validate text
    ctx.assert(
      text && typeof text === 'string' && text.length > 3,
      'Enter text'
    )
    // Fetch user and compare to comment author
    const comment = await this.commentService.getComment(id)
    const user = await this.userService.getUser(author)
    ctx.assert(String(comment.author) === String(user._id), 'Not your comment')
    // Edit comment
    const edit = await this.commentService.editComment(comment, text)
    // Send back res on success
    ctx.body = edit
  }
  async deleteComment(ctx) {
    const { id } = ctx.params
    ctx.assert(id && isMongoId(id), 'Enter a valid id')
    // Strip user id off of jwt
    const token = ctx.request.headers.authorization.split('Bearer ')[1]
    const author = jwt.decode(token).id
    // Fetch user and compare to comment author
    const comment = await this.commentService.getComment(id)
    const user = await this.userService.getUser(author)
    ctx.assert(String(comment.author) === String(user._id), 'Not your comment')
    // delete comment
    const deleted = await this.commentService.deleteComment(comment)
    // Send back res on success
    ctx.body = deleted
  }
  // TODO
  async reply(ctx) {}
}
