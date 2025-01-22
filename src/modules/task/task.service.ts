import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './schemas/task.schema';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<Task>,
  ) {}

  /**
   * Get all boards.
   * @returns An array of tasks
   */
  async getTasks(boardId: string, columnId?: string): Promise<Task[]> {
    const query = columnId ? { boardId, columnId } : { boardId };
    return this.taskModel.find(query).exec();
  }

  /**
   * Create a new board.
   * @param taskData - Data for the new comment
   * @returns The newly created tasks
   */
  async createTask(taskData: Partial<Task>): Promise<Task> {
    const newTask = new this.taskModel(taskData);
    return newTask.save();
  }

  /**
   * Create a new board.
   * @param taskId - find the comment
   * @param updatedData - update the data
   * @returns The newly created comment
   */

  async updateTask(
    taskId: string,
    updatedData: Partial<Task>,
  ): Promise<Task | null> {
    return this.taskModel
      .findByIdAndUpdate(taskId, updatedData, { new: true })
      .exec();
  }

  /**
   * Create a new board.
   * @param taskId - find the comment
   * @returns the new number of comments
   */

  async deleteTask(taskId: string): Promise<boolean> {
    const result = await this.taskModel.deleteOne({ _id: taskId }).exec();
    return result.deletedCount > 0;
  }
}
