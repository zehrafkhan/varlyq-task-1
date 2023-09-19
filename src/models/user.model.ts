import { User } from '@/commonlib/interfaces/user.interface';
import { model, Schema, Document } from 'mongoose';

const userSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobileNo: { type: String, required: true },
  password: { type: String, required: true },
});
const UserSchema = model<User & Document>('User', userSchema);

export default UserSchema;
