import { Request } from 'express';
export interface Payload {
  userId?: string;
}
export interface RequestWithPayload extends Request {
  payload?: Payload;
  value?: Array<number>;
}
