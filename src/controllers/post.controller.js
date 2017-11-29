import PostService from '../services/post.service'

export default class PostController {
  constructor() {
    this.postService = new PostService()
  }
  createPost = async ctx => {}
  getPostsByAuthor = async ctx => {}
  getPostsByCommunity = async ctx => {}
  search = async ctx => {}
  getPost = async ctx => {}
  getUserSubs = async ctx => {}
  downvote = async ctx => {}
  upvote = async ctx => {}
  editPost = async ctx => {}
  deletePost = async ctx => {}
}
