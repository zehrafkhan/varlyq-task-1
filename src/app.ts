import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { ErrorResponse, logError } from './utils/common';
import { LOG_FORMAT, NODE_ENV, PORT } from './config';
import { logger } from '@utils/logger';
import morgan from 'morgan';
import helmet from 'helmet';
import hpp from 'hpp';
import { Routes } from './commonlib/interfaces/shared/routes.interface';
import compression from 'compression';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import 'reflect-metadata';
import { connect, set } from 'mongoose';
import { dbConnection } from '@databases';
import { HttpError } from 'http-errors';

class App {
  public app: express.Application;
  public env: string;
  public port: string | number;
  public log_format: string;
  redis = require('./utils/init_redis');
  nodemon = require('./utils/init_nodemon');

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 5000;
    this.log_format = LOG_FORMAT || 'dev';
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeSwagger();
    this.initializeErrorHandling();
    this.connectToDatabase();
    // this.cron();
    // this.getToken;
    this.redis;
    this.nodemon;
  }
  private connectToDatabase() {
    if (this.env !== 'production') {
      set('debug', true);
    }
    connect(dbConnection.url, dbConnection.options)
      .then(data => console.log('database connected'))
      .catch(err => {
        console.log(err.message);
      });
  }
  public listen() {
    this.app
      .listen(this.port, () => {
        logger.info(`=================================`);
        logger.info(`======= ENV: ${this.env} =======`);
        logger.info(`🚀 App listening on the port ${this.port}`);
        logger.info(`=================================`);
      })
      .on('error', function (err) {
        console.log(err.message);
      });
  }

  public getServer() {
    return this.app;
  }

  // private cron() {
  //   new TokenCron();
  // }

  private initializeMiddlewares() {
    this.app.use(morgan(this.log_format));
    this.app.use(cors({ origin: '*', optionsSuccessStatus: 200 }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json({ limit: '50mb' }));
    this.app.use(express.urlencoded({ extended: true }));
    // this.app.use(timeout(1200000, {}));
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }

  private initializeSwagger() {
    const options = {
      swaggerDefinition: {
        info: {
          title: 'PASIVO',
          version: '1.0.0',
          description: 'Example docs',
        },
      },
      apis: ['swagger.yaml'],
    };

    const specs = swaggerJSDoc(options);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  }

  private initializeErrorHandling() {
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      const error = new Error('Not Found');
      if (this.env == 'production') {
        logError(req, 404, error.message);
      }
      ErrorResponse(res, 404, error.message);
    });

    this.app.use((error: HttpError, req: Request, res: Response, next: NextFunction) => {
      if (this.env == 'production') {
        logError(req, error.status || 500, error.message);
      }
      ErrorResponse(res, error.status || 500, error.message);
    });
  }
}

export default App;
