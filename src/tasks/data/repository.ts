import TaskModel, { TaskData } from './model';

export const findAll = (): Promise<TaskData[]> => TaskModel.find().exec();
