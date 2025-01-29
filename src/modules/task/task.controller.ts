import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './schemas/task.schema';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getTasks(
    @Query('boardId') boardId: string,
    @Query('columnId') columnId?: string,
  ): Promise<Task[]> {
    return this.taskService.getTasks(boardId, columnId);
  }

  @Post()
  async createTask(
    @Body() taskData: Omit<Task, 'id' | 'createdAt'>,
  ): Promise<Task> {
    return this.taskService.createTask(taskData);
  }

  @Patch(':id')
  async updateTask(
    @Param('id') taskId: string,
    @Body()
    updatedData: Partial<
      Omit<Task, 'id' | 'boardId' | 'columnId' | 'createdAt'>
    >,
  ): Promise<Task | null> {
    return this.taskService.updateTask(taskId, updatedData);
  }
}
