/**
 * @description pm2 configuration file.
 * @example
 *  production mode :: pm2 start ecosystem.config.js --only prod
 *  development mode :: pm2 start ecosystem.config.js --only dev
 */

module.exports = {
  apps: [
    {
      name: 'pasivo-api',
      script: './dist/server.js',
      exec_mode: 'fork',
      instance_var: 'INSTANCE_ID',
      instances: 1,
      node_args: '-r ts-node/register -r tsconfig-paths/register',
      autorestart: true,
      watch: false,
      ignore_watch: ['node_modules', 'logs'],
      max_memory_restart: '1G',
      merge_logs: true,
      output: './logs/access.log',
      error: './logs/error.log',
      env: {
        TS_NODE_BASEURL: './dist',
        PORT: 5000,
        NODE_ENV: 'production',
        REDIS: 'localhost:6379',
      },
    },
  ],
};

// const deploy = {
//   production: {
//     user: 'user',
//     host: '0.0.0.0',
//     ref: 'origin/master',
//     repo: 'git@github.com:repo.git',
//     path: 'dist/server.js',
//     'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.js --only prod',
//   },
// };
