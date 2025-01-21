import { Injectable } from '@nestjs/common';
import { Task } from './interfaces';
import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs

@Injectable()
export class TaskService {
  private tasks: Task[] = []; // In-memory storage for tasks

  /**
   * Get all tasks for a specific board or column.
   * @param boardId - ID of the board
   * @param columnId - ID of the column (optional)
   * @returns An array of tasks
   */
  getTasks(boardId: string, columnId?: string): Task[] {
    return this.tasks.filter(
      (task) =>
        task.boardId === boardId && (!columnId || task.columnId === columnId),
    );
  }

  /**
   * Create a new task.
   * @param taskData - Data for the new task (excluding id and createdAt)
   * @returns The newly created task
   */
  createTask(taskData: Omit<Task, 'id' | 'createdAt'>): Task {
    const newTask: Task = {
      id: uuidv4(), // Generate a unique ID
      createdAt: new Date(), // Auto-generate the creation timestamp
      ...taskData,
    };
    this.tasks.push(newTask); // Add the new task to the in-memory array
    return newTask;
  }

  /**
   * Update an existing task.
   * @param taskId - ID of the task to update
   * @param updatedData - Partial data to update in the task
   * @returns The updated task, or null if not found
   */
  updateTask(
    taskId: string,
    updatedData: Partial<
      Omit<Task, 'id' | 'boardId' | 'columnId' | 'createdAt'>
    >,
  ): Task | null {
    const taskIndex = this.tasks.findIndex((task) => task.id === taskId);
    if (taskIndex === -1) {
      return null; // Task not found
    }
    const updatedTask = {
      ...this.tasks[taskIndex],
      ...updatedData,
      updatedAt: new Date(), // Update the timestamp
    };
    this.tasks[taskIndex] = updatedTask;
    return updatedTask;
  }

  /**
   * Delete a task by ID.
   * @param taskId - ID of the task to delete
   * @returns `true` if the task was deleted, `false` if not found
   */
  deleteTask(taskId: string): boolean {
    const initialLength = this.tasks.length;
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
    return this.tasks.length < initialLength; // Return true if a task was removed
  }
}
