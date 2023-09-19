import { ApiV1 } from '@/utils/variable';
import { CHECK_USER } from '@/utils/adminvalidtion';
import { Routes } from '@interfaces/shared/routes.interface';
import { Router } from 'express';
import AuthController from './auth.controller';
import { verifyAccessToken } from '@/services/token.service';

class AuthRoute implements Routes {
  public path = '/auth';
  public user = '/user';
  public router = Router();
  public userController = new AuthController();
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${ApiV1}${this.user}${this.path}/signup`, CHECK_USER(true), this.userController.userSignup);
    this.router.post(`${ApiV1}${this.user}${this.path}/login`, CHECK_USER(true), this.userController.userLogin);
    this.router.get(`${ApiV1}${this.user}${this.path}`, this.userController.getAllUsers);
    this.router.patch(`${ApiV1}${this.user}${this.path}/:id`, verifyAccessToken(), this.userController.userUpdate);
    this.router.delete(`${ApiV1}${this.user}${this.path}/:id`, verifyAccessToken(), this.userController.userDelete);
  }
}
export default AuthRoute;
