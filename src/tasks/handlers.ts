import { Request } from 'express';
import { RequestHandler, HttpResult, HttpError } from 'core/http/dtos';
import { TaskEither, bimap } from 'fp-ts/lib/TaskEither';
import Task from 'tasks/domain/model'
import { getTasks } from 'tasks/domain/interactor';
import { findAll } from 'tasks/data/repository';

export const list: RequestHandler<Task[]> = (_req: Request): TaskEither<HttpError, HttpResult<Task[]>> => {
  const successCase = (tasks: Task[]) => ({ status: 200, content: tasks });
  const failureCase = (error: Error) => ({ status: 500, message: error.message });

  const handleResult = bimap(failureCase, successCase);
  return handleResult(getTasks(findAll));
};
