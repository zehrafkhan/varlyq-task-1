import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const {
  REDIS,
  NODE_ENV,
  PORT,
  SECRET_KEY,
  LOG_FORMAT,
  LOG_DIR,
  ORIGIN,
  JWT_ACCESS_KEY,
  BASEURL,
  APIKEY,
  DB_USERNAME,
  DB_PASSWORD,
  DB_URL,
} = process.env;
