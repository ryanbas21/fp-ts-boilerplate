import { Request } from 'express';
import { RequestHandler, HttpResult, HttpError } from 'core/http/dtos';
import { listAll } from './repository';
import { TaskEither, bimap } from 'fp-ts/lib/TaskEither';
import { Task } from './model';

export const list: RequestHandler<Task[]> = (_req: Request): TaskEither<HttpError, HttpResult<Task[]>> => {
  const successCase = (tasks: Task[]) => ({ status: 200, content: tasks });
  const failureCase = (error: string) => ({ status: 500, message: error });

  const handleResult = bimap(failureCase, successCase);
  return handleResult(listAll);
}
