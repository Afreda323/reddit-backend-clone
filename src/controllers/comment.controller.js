import CommentService from '../services/comment.service'

export default class CommentController {
  constructor() {
    this.commentService = new CommentService()
  }
  getComment = async ctx => {}
  getCommentsByPost = async ctx => {}
  getPostsByAuthor = async ctx => {}
  getCommentsByAuthor = async ctx => {}
  editComment = async ctx => {}
  downvote = async ctx => {}
  upvote = async ctx => {}
  deleteComment = async ctx => {}
  postComment = async ctx => {}
  reply = async ctx => {}
}
