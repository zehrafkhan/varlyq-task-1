import { User } from './../../commonlib/interfaces/user.interface';
import PostSchema from '@/models/post.model';
import TokenService from '@/services/token.service';
import { ApiMessage } from '@/utils/messages';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';

class PostService {
  tokenService = new TokenService();
  public creatPost(body: any) {
    return new Promise<any>(async (resolve, reject) => {
      try {
        await PostSchema.validate(body);
        const data = await PostSchema.create(body);
        resolve({
          data,
        });
      } catch (error) {
        reject(error);
      }
    });
  }
  public getAllPosts(query: any) {
    return new Promise<any>(async (resolve, reject) => {
      try {
        let totalCount = await PostSchema.countDocuments();
        const data = await PostSchema.find().sort({ createdAt: -1 }).select('-__v');
        resolve({
          data: data,
          params: {
            totalCount: totalCount,
          },
        });
      } catch (error) {
        reject(error);
      }
    });
  }
  public getPostById(id: string) {
    return new Promise<any>(async (resolve, reject) => {
      try {
        let totalCount = await PostSchema.countDocuments({ createdBy: id });
        const data = await PostSchema.find({ createdBy: id }).sort({ createdAt: -1 }).select('-__v');
        resolve({
          data: data,
          params: {
            totalCount: totalCount,
          },
        });
      } catch (error) {
        reject(error);
      }
    });
  }
  public addcomment(id: any, commentDetails: { comment: string; sentBy: mongoose.Types.ObjectId | User }) {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const post = await PostSchema.findOne(id);
        if (!post) {
          return reject('Post not found');
        }
        const newComment = {
          comment: commentDetails.comment,
          sentBy: commentDetails.sentBy,
          sentAt: new Date(),
          liked: [],
        };

        const updatedPost = await PostSchema.findOneAndUpdate(id, { $push: { comments: newComment } }, { new: true });
        resolve({ post: updatedPost });
      } catch (error) {
        reject(error);
      }
    });
  }

  public updatePost(id: any, body: any = {}) {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const postExist = await PostSchema.findById(id);
        if (!postExist) reject(new createHttpError.NotAcceptable('Post' + ApiMessage.notfound));
        const data = await PostSchema.findByIdAndUpdate({ _id: id }, { $set: body }, { returnOriginal: false });
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }
  public deletePost(id: any) {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const postExist = await PostSchema.findById(id);
        if (!postExist) reject(new createHttpError.NotAcceptable('Post' + ApiMessage.notfound));
        const data = await PostSchema.findByIdAndDelete({ _id: id });
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }
}
export default PostService;
