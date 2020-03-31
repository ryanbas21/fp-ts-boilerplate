import { Request } from 'express';
import { TaskEither } from 'fp-ts/lib/TaskEither';

interface HttpResponse {
  status?: number;
  headers?: Record<string, string>;
}

export interface HttpError extends HttpResponse {
  message: string;
}

export interface HttpResult<T> extends HttpResponse {
  content?: T;
  redirectTo?: string;
}

export enum HttpMethod {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  PATCH = 'patch',
  DELETE = 'delete',
  OPTIONS = 'options',
}

export type RequestHandler<T> = (req: Partial<Request>) => TaskEither<HttpError, HttpResult<T>>;
