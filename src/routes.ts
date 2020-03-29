import { Application, Router } from 'express';
import registerTaskRoutes from 'app/task/routes';

export const configureRoutes = (app: Application): void => {
  const router = Router();
  registerTaskRoutes(router);

  app.use('/api/v1', router);
}
