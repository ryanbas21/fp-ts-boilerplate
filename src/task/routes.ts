import { Route, defineRoutes } from 'core/routing';
import { Router } from 'express';
import { HttpMethod } from 'core/http/dtos';
import { list } from 'app/task/handlers';

const routes: Route[] = [
  [HttpMethod.GET, '/', list]
];

export default (router: Router): void => {
  defineRoutes(router, routes);
}
