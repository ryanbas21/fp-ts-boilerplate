import { Request } from 'express';
import { Either } from 'fp-ts/lib/Either';

interface HttpResponse {
  status?: number;
  headers?: Record<string, string>;
}

export interface HttpError extends HttpResponse {
  message: string;
}

export interface HttpResult extends HttpResponse {
  content?: string;
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

export type RequestHandler = (req: Request) => Either<HttpError, HttpResult>;
