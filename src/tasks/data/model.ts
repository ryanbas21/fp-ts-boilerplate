import { Document, Schema, model } from 'mongoose';
import Task from 'tasks/domain/model';

const TaskSchema = new Schema({
  description: String,
  completed: Boolean,
});

export interface TaskData extends Document {
  description: string;
  completed: boolean;
}

export const toDomain = (task: TaskData): Task => ({
  id: task._id,
  description: task.description,
  completed: task.completed,
});

export default model<TaskData>('Task', TaskSchema);
