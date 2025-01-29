import { Controller, Post, Body, Param, Get, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  getAllComments() {
    return this.commentService.getAllComments();
  }

  @Get(':taskId')
  getComments(@Param('taskId') taskId: string) {
    return this.commentService.getCommentsForTask(taskId);
  }

  @Post()
  createComment(@Body() commentData: any) {
    return this.commentService.createComment(commentData);
  }
}
