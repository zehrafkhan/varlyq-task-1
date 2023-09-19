import { DB_PASSWORD, DB_URL, DB_USERNAME } from '@config';

export const dbConnection = {
  url: `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}${DB_URL}`,
  options: {},
};
