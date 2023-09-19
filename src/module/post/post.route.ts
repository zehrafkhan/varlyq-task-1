import { ApiV1 } from '@/utils/variable';
import { CHECK_POST, CHECK_POST_DELETE_AND_UPDATE_PARAMS } from '@/utils/adminvalidtion';
import { Routes } from '@interfaces/shared/routes.interface';
import { Router } from 'express';
import PostController from './post.controller';

class PostRoute implements Routes {
  public path = '/post';
  public user = '/user';
  public router = Router();
  public postController = new PostController();
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${ApiV1}${this.path}`, CHECK_POST(), this.postController.createPost);

    this.router.get(`${ApiV1}${this.path}`, this.postController.getAllPosts);

    this.router.get(`${ApiV1}${this.path}/:id`, this.postController.getPostById);

    this.router.post(`${ApiV1}${this.path}/:id/comment`, this.postController.addcomment);

    this.router.patch(
      `${ApiV1}${this.path}/:id/update`,
      CHECK_POST_DELETE_AND_UPDATE_PARAMS(),
      this.postController.updatePost,
    );

    this.router.delete(
      `${ApiV1}${this.path}/:id/delete`,
      CHECK_POST_DELETE_AND_UPDATE_PARAMS(),
      this.postController.deletePost,
    );
  }
}
export default PostRoute;
