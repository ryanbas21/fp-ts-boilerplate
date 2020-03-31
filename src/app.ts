import * as express from 'express';
import { configureRoutes } from 'app/routes';
import { configureMiddlewares } from 'app/middlewares';
import { configureDatabase } from 'app/database';

export const createApplication = (): express.Application => {
  const app: express.Application = express();

  configureRoutes(app);
  configureMiddlewares(app);
  configureDatabase();

  return app;
};
