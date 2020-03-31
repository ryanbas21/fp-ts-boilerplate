import { curry } from 'ramda';
import { Request, Response, Router } from 'express';
import { fold } from 'fp-ts/lib/Either';
import {
  HttpError, HttpMethod, HttpResult, RequestHandler,
} from './http/dtos';

export type Route = [HttpMethod, string, RequestHandler<unknown>];

const sendErrorResponse = (res: Response) => (error: HttpError) => {
  const status = error.status || 500;
  res.status(status).send({ message: error.message });
};

const sendSuccessResponse = <T>(res: Response) => (result: HttpResult<T>) => {
  res.status(result.status).json(result.content);
};

export const handleResult = <T>(handler: RequestHandler<T>) =>
  async (req: Request, res: Response): Promise<void> => {

  const result = handler(req);
  const sendResponseFor = fold(sendErrorResponse(res), sendSuccessResponse(res));
  sendResponseFor(await result());
};

export const defineRoutes = curry((router: Router, routes: Route[]): void => {
  const registerRoute = ([method, path, handler]: Route): void => {
    router[method](path, handleResult(handler));
  };

  routes.forEach((route: Route) => registerRoute(route));
});
