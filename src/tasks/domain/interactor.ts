import { map } from 'ramda';
import { tryCatch, TaskEither } from 'fp-ts/lib/TaskEither';
import { TaskData, toDomain } from 'tasks/data/model';
import Task from './model';

type TaskFetcherFn = () => Promise<TaskData[]>;

export const getTasks = (fetcher: TaskFetcherFn): TaskEither<Error, Task[]> => {
  return tryCatch(
    () => fetcher().then(map(toDomain)),
    reason => new Error(String(reason))
  )
};
