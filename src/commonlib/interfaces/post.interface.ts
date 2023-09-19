import mongoose, { Document } from 'mongoose';
import { User } from './user.interface';

export interface Post {
  createdBy: mongoose.Schema.Types.ObjectId | User;
  message: string;
  comments: Comment[];
}
interface Comment {
  sentBy: mongoose.Schema.Types.ObjectId | User;
  comment: string;
  sentAt: Date;
  liked: (mongoose.Schema.Types.ObjectId | User)[];
}
