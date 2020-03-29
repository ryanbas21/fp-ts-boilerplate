import { Request } from 'express';
import { Either, right } from 'fp-ts/lib/Either';
import { RequestHandler, HttpResult, HttpError } from 'core/http/dtos';

export const list: RequestHandler = (req: Request): Either<HttpError, HttpResult> =>
  right({ status: 200, content: 'ok'});
