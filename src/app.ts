import * as express from 'express'
import { configureRoutes } from 'core/routing';
import { configureMiddlewares } from 'app/middlewares';

export const createApplication = (): express.Application => {
    const app: express.Application = express();

    configureRoutes(app);
    configureMiddlewares(app);

    return app;
}
