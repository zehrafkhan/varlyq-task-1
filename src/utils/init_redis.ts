import { NODE_ENV, REDIS } from '../config';
import { createClient } from 'redis';

const client = createClient({
  url: 'redis://' + REDIS,
});

client.connect();

client.on('error', err => {
  console.log('Redis Client Error', err);
});

// process.on('SIGINT', () => {
//   client.quit();
// });

export default client;
