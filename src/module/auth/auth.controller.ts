import { body, param } from 'express-validator';
import { CheckErrors, DataResponse, ErrorResponse, ErrorValidations } from '@/utils/common';
import { NextFunction, Request, Response } from 'express';
import AuthService from './auth.service';
import { ApiMessage } from '@/utils/messages';
import { reject } from 'lodash';
import TokenService from '@/services/token.service';

class AuthController {
  private userservice = new AuthService();
  public userSignup = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let checkErrorsExits = CheckErrors(req);
      if (checkErrorsExits) return ErrorValidations(res, req, 422);
      const data = await this.userservice.userSignup(req.body);
      DataResponse(req, res, 200, ApiMessage.success, data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
  public userLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let checkErrorExist = CheckErrors(req);
      if (checkErrorExist) return ErrorValidations(res, req, 422);
      const data = await this.userservice.userLogin(req.body);
      DataResponse(req, res, 200, ApiMessage.success, data);
    } catch (error) {
      next(error);
    }
  };
  public getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let checkErrorExist = CheckErrors(req);
      if (checkErrorExist) return ErrorValidations(res, req, 422);
      const data = await this.userservice.getAllUsers(req.query);
      DataResponse(req, res, 200, ApiMessage.success, data.data, data.params);
    } catch (error) {
      next(error);
    }
  };
  public userUpdate = async (req: Request | any, res: Response, next: NextFunction) => {
    try {
      let checkErrorExist = CheckErrors(req);
      if (checkErrorExist) return ErrorValidations(res, req, 422);
      const data = await this.userservice.userUpdate(req.params.id, req.body);
      DataResponse(req, res, 200, ApiMessage.update, data);
    } catch (error) {
      reject(error);
    }
  };
  public userDelete = async (req: Request | any, res: Response, next: NextFunction) => {
    try {
      let checkErrorExist = CheckErrors(req);
      if (checkErrorExist) return ErrorValidations(res, req, 422);
      const data = await this.userservice.userDelete(req.params.id);
      DataResponse(req, res, 200, ApiMessage.delete, data);
    } catch (error) {
      reject(error);
    }
  };
}

export default AuthController;
