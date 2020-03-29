import { map } from 'ramda';
import { Document, Schema, model } from 'mongoose';
import { tryCatch, TaskEither } from 'fp-ts/lib/TaskEither';
import { Task } from './model';

const TaskSchema = new Schema({
  description: String,
  completed: Boolean,
});

function modelToDto (doc: Document) {
  const { _id: id, ...rest } = doc.toObject();
  return { ...rest, id };
}

const TaskModel = model('Task', TaskSchema);

export const listAll: TaskEither<string, Task[]> = tryCatch(() => {
  const query = TaskModel.find();
  return query
    .exec()
    .then(map(modelToDto));
}, String);

export const save = (task: Task): Promise<Task> => {
  const model = new TaskModel(task);
  return model
    .save()
    .then(modelToDto);
};
