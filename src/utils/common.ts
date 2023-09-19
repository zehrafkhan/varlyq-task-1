import { logger } from './logger';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { NODE_ENV } from '@/config';
import { generate, charset, Charset } from 'referral-codes';

export function logError(req: Request, statusCode: number, message: string) {
  logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${statusCode}, Message:: ${message}`);
}

export function logInfo(req: Request, statusCode: number, message: string, data: any = {}) {
  logger.info(
    `[${req.method}] ${req.path} >> StatusCode:: ${statusCode}, Message:: ${message} Data:: ${JSON.stringify(data)}`,
  );
}

export function DataResponse(
  req: Request,
  res: Response,
  statusCode: number,
  message: string,
  data: any,
  params: any = {},
) {
  if (NODE_ENV == 'production') {
    logInfo(req, res.statusCode, message, data);
  }
  return res.status(statusCode).json({
    statusCode,
    message,
    params,
    data,
  });
}
const EXPIRETIME = 86400;

export const BAD_REQUEST = '400_BAD_REQUEST';

export function ErrorResponse(res: Response, statusCode: number, message: string) {
  return res.status(statusCode).json({
    error: {
      message,
    },
  });
}

export function ErrorValidations(res: Response, req: Request, code: number) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(code).json({
      error: {
        message: 'Please Fill All Details Correctly',
        errors: errors.array(),
      },
    });
  }
}
export function getRefferalCOde() {
  const alphabetRefferalCode = generate({
    length: 4,
    count: 1,
    charset: charset(Charset.ALPHABETIC),
  });
  const numericRefferalCode = generate({
    length: 4,
    count: 1,
    charset: charset(Charset.NUMBERS),
  });
  const refferalCode = numericRefferalCode[0] + alphabetRefferalCode[0].toUpperCase();
  return refferalCode;
}
export function CheckErrors(req: Request) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return true;
  } else {
    return false;
  }
}
