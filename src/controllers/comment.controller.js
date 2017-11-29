import CommentService from '../services/comment.service'

export default class CommentController {
  constructor() {
    this.commentService = new CommentService()
  }
}
