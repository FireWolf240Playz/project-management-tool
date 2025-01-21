import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './interfaces';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  getTasks(
    @Query('boardId') boardId: string,
    @Query('columnId') columnId?: string,
  ): Task[] {
    return this.taskService.getTasks(boardId, columnId);
  }

  @Post()
  createTask(@Body() taskData: Omit<Task, 'id' | 'createdAt'>): Task {
    return this.taskService.createTask(taskData);
  }

  @Patch(':id')
  updateTask(
    @Param('id') taskId: string,
    @Body()
    updatedData: Partial<
      Omit<Task, 'id' | 'boardId' | 'columnId' | 'createdAt'>
    >,
  ): Task | null {
    return this.taskService.updateTask(taskId, updatedData);
  }

  @Delete(':id')
  deleteTask(@Param('id') taskId: string): boolean {
    return this.taskService.deleteTask(taskId);
  }
}
