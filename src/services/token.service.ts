import { JWT_ACCESS_KEY, SECRET_KEY } from '../config';
import { Payload, RequestWithPayload } from '../commonlib/interfaces/shared/request.interface';
import { ErrorResponse } from '../utils/common';
import { logger } from '../utils/logger';
import { NextFunction, Response } from 'express';
import JWT from 'jsonwebtoken';
import createHttpError from 'http-errors';

class TokenService {
  data: any;
  private next!: NextFunction;
  secret = JWT_ACCESS_KEY!;
  public async signAccessToken(userId: any): Promise<any> {
    try {
      const payload = {
        userId: userId,
      };
      const options = {
        expiresIn: '365d',
        issuer: 'pasivo',
      };
      const token = JWT.sign(payload, this.secret, options);
      return token;
    } catch (error) {
      console.error(error);
      logger.error(error);
    }
  }
}

export default TokenService;

export function verifyAccessToken() {
  return (req: RequestWithPayload, res: Response, next: NextFunction) => {
    if (!req.headers['authorization']) return ErrorResponse(res, 401, 'Unauthorized');
    const authHeader = req.headers['authorization'];
    const bearerToken = authHeader.split(' ');
    const token = bearerToken[1];
    const secret = JWT_ACCESS_KEY!;
    JWT.verify(token, secret, (err: any, payload: Payload | any) => {
      if (err) {
        const message = err.name === 'TokenExpiredError' ? 'Session Expired' : err.message;
        next(new createHttpError.Unauthorized(message!));
      }
      if (req.params.id !== payload.userId) {
        return next(new createHttpError.Forbidden('Unauthorized'));
      }
      req.payload = payload;
      next();
    });
  };
}
