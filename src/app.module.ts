import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { BoardModule } from './modules/board/board.module';
import { TaskModule } from './modules/task/task.module';
import { CommentModule } from './modules/comment/comment.module';

@Module({
  imports: [UserModule, BoardModule, TaskModule, CommentModule],
})
export class AppModule {}
