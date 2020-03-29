import * as express from 'express';
import * as cors from 'cors';
import { json as jsonParser } from 'body-parser';

export const jsonMiddleware = jsonParser();
export const corsMiddleware = cors();

export const configureMiddlewares = (app: express.Application) => {
    app.use(jsonMiddleware);
    app.use(corsMiddleware);
}
