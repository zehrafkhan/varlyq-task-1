import { Post } from '@/commonlib/interfaces/post.interface';
import mongoose, { model, Schema, Document } from 'mongoose';

const postSchema: Schema = new Schema<Post>(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    comments: [
      {
        sentBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
        sentAt: {
          type: Date,
          default: Date.now,
          required: true,
        },
        liked: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
          },
        ],
      },
    ],
  },
  { timestamps: true },
);
const PostSchema = model<Post & Document>('Post', postSchema);

export default PostSchema;
