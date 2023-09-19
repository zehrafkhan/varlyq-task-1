import { User } from '@/commonlib/interfaces/user.interface';
import UserSchema from '@/models/user.model';
import TokenService from '@/services/token.service';
import { ApiMessage } from '@/utils/messages';
import { compare, genSalt, hash } from 'bcrypt';
import createHttpError from 'http-errors';

class AuthService {
  tokenService = new TokenService();
  public async userSignup(body: User) {
    return new Promise(async (resolve, reject) => {
      try {
        if (Object.keys(body).length == 0) throw new createHttpError.NotAcceptable(ApiMessage.emptybody);
        const { email, password } = body;
        const userExist = await UserSchema.findOne({ email: email }).select('-__v');
        if (userExist) throw new createHttpError.NotAcceptable(ApiMessage.alreadyexist);
        const salt = await genSalt(12);
        const hashedPassword = await hash(password, salt);
        body['password'] = hashedPassword;
        await UserSchema.validate(body);
        const result = await UserSchema.create(body);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }
  public async userLogin(body: User) {
    return new Promise(async (resolve, reject) => {
      try {
        const { email, password } = body;
        if (Object.keys(body).length == 0) throw new createHttpError.NotAcceptable(ApiMessage.emptybody);
        const user = await UserSchema.findOne({ email: email }).select('-__v');
        if (!user) throw new createHttpError.NotAcceptable(ApiMessage.usernotfound);
        const isMatch = await compare(password, user.password);
        if (!isMatch) throw new createHttpError.NotAcceptable(ApiMessage.passwordnotvalid);
        let accessToken = await this.tokenService.signAccessToken(user._id);
        resolve({ user: user, tokens: { accessToken: accessToken } });
      } catch (error) {
        reject(error);
      }
    });
  }
  public async getAllUsers(query: any) {
    return new Promise<any>(async (resolve, reject) => {
      try {
        let totalCount = await UserSchema.countDocuments();
        const data = await UserSchema.find().sort({ createdAt: -1 }).select('-__v');
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
  public userUpdate(id: any, body: any = {}) {
    return new Promise<any>(async (resolve, reject) => {
      try {
        if (Object.keys(body).length == 0) throw new createHttpError.NotAcceptable(ApiMessage.emptybody);
        const userExist = await UserSchema.findOne({ _id: id });
        if (!userExist) reject(new createHttpError.NotAcceptable('User' + ApiMessage.notfound));
        const data = await UserSchema.findOneAndUpdate({ _id: id }, { $set: body }, { returnOriginal: false });
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }
  public userDelete(id: string) {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const userExist = await UserSchema.findOne({ _id: id });
        if (!userExist) reject(new createHttpError.NotAcceptable('User' + ApiMessage.notfound));
        const data = await UserSchema.findOneAndDelete({ _id: id }, { returnDocument: 'befor' });
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default AuthService;
