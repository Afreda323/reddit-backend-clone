import PostService from '../services/post.service'

export default class PostController {
  constructor() {
    this.postService = new PostService()
  }
}
