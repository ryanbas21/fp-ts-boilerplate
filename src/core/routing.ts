import { Application, Request, Response, Router } from 'express';
import { fold } from 'fp-ts/lib/Either';
import { HttpError, HttpMethod, HttpResult, RequestHandler } from './http/dtos';

type Route = [HttpMethod, string, RequestHandler];
export const configureRoutes = (app: Application): void => {
    const router: Router = Router();

    app.use('/api/v1', router);
};

export const handleResult = (handler: RequestHandler) => (req: Request, res: Response): void => {
  const result = handler(req);

  const onError = (error: HttpError) => {
    const status = error.status || 500;
    res.status(status).send({ message: error.message });
  }

  const onSuccess = (result: HttpResult) => {
    res.status(result.status).json(result.content);
  }

  const sendResponseFor = fold(onError, onSuccess);

  sendResponseFor(result);
}

const bindRouter = (router: Router) => ([method, path, handler]: Route): void => {
  router[method](path, handleResult(handler));
}

export const defineRoutes = (router: Router) => (routes: Route[]): void => {
  const defineRoute = bindRouter(router);
  routes.forEach((route: Route) => defineRoute(route));
}
