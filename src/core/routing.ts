import { curry } from 'ramda';
import { Request, Response, Router } from 'express';
import { fold } from 'fp-ts/lib/Either';
import { HttpError, HttpMethod, HttpResult, RequestHandler } from './http/dtos';

export type Route = [HttpMethod, string, RequestHandler<unknown>];

export const handleResult = <T>(handler: RequestHandler<T>) => async (req: Request, res: Response): Promise<void> => {
  const result = handler(req);

  const onError = (error: HttpError) => {
    const status = error.status || 500;
    res.status(status).send({ message: error.message });
  }

  const onSuccess = (result: HttpResult<T>) => {
    res.status(result.status).json(result.content);
  }

  const sendResponseFor = fold(onError, onSuccess);

  sendResponseFor(await result());
}

export const defineRoutes = curry((router: Router, routes: Route[]): void => {
  const registerRoute = ([method, path, handler]: Route): void => {
    router[method](path, handleResult(handler));
  }

  routes.forEach((route: Route) => registerRoute(route));
});
