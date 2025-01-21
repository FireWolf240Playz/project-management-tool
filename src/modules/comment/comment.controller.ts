import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { CommentService } from './comment.service';

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
