import { User } from './../../commonlib/interfaces/user.interface';
import { body, param } from 'express-validator';
import { CheckErrors, DataResponse, ErrorResponse, ErrorValidations } from '@/utils/common';
import { NextFunction, Request, Response } from 'express';
import PostService from './post.service';
import { ApiMessage } from '@/utils/messages';
import mongoose from 'mongoose';

class PostController {
  private postService = new PostService();
  public createPost = async (req: Request | any, res: Response, next: NextFunction) => {
    try {
      let checkErrorsExits = CheckErrors(req);
      if (checkErrorsExits) return ErrorValidations(res, req, 422);
      const data = await this.postService.creatPost(req.body);
      DataResponse(req, res, 200, ApiMessage.success, data);
    } catch (error) {
      next(error);
    }
  };
  public getAllPosts = async (req: Request | any, res: Response, next: NextFunction) => {
    try {
      let checkErrorsExits = CheckErrors(req);
      if (checkErrorsExits) return ErrorValidations(res, req, 404);
      const data = await this.postService.getAllPosts(req.query);
      DataResponse(req, res, 200, ApiMessage.success, data.data, data.params);
    } catch (error) {
      next(error);
    }
  };
  public getPostById = async (req: Request | any, res: Response, next: NextFunction) => {
    try {
      let checkErrorsExits = CheckErrors(req);
      if (checkErrorsExits) return ErrorValidations(res, req, 404);
      const data = await this.postService.getPostById(req.params.id);
      DataResponse(req, res, 200, ApiMessage.success, data.data, data.params);
    } catch (error) {
      next(error);
    }
  };
  public addcomment = async (req: Request | any, res: Response, next: NextFunction) => {
    let checkErrorExist = CheckErrors(req);
    if (checkErrorExist) return ErrorValidations(res, req, 422);
    const { id, comment, sentBy } = req.body;
    const data = await this.postService.addcomment(id, {
      comment,
      sentBy,
    });
    DataResponse(req, res, 200, ApiMessage.success, data);
  };
  public updatePost = async (req: Request | any, res: Response, next: NextFunction) => {
    let checkErrorExist = CheckErrors(req);
    if (checkErrorExist) return ErrorValidations(res, req, 422);
    const data = await this.postService.updatePost(req.params.id, req.body);
    DataResponse(req, res, 200, ApiMessage.update, data);
  };
  public deletePost = async (req: Request | any, res: Response, next: NextFunction) => {
    let checkErrorExist = CheckErrors(req);
    if (checkErrorExist) return ErrorValidations(res, req, 422);
    const data = await this.postService.deletePost(req.params.id);
    DataResponse(req, res, 200, ApiMessage.delete, data);
  };
}

export default PostController;
