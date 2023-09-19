import { body, param } from 'express-validator';
import JWT from 'jsonwebtoken';

export function CHECK_USER(isLogin: boolean) {
  if (isLogin) {
    return [
      body('email').isEmail().withMessage('Invalid Email'),
      body('password').notEmpty().withMessage('Password Is Required'),
    ];
  } else {
    return [
      body('email').isEmail().withMessage('Invalid Email'),
      body('password').notEmpty().withMessage('Password Is Required'),
      body('name').notEmpty().withMessage(' Name Is Required'),
      body('mobileNo').notEmpty().withMessage('mobileNo Is Required'),
    ];
  }
}
export function CHECK_POST() {
  return [
    body('createdBy').exists().withMessage('ID Is Required'),
    body('message').exists().withMessage('Message Is Required'),
  ];
}
export function CHECK_POST_DELETE_AND_UPDATE_PARAMS() {
  return [param('id').exists().withMessage('id Is Required')];
}
