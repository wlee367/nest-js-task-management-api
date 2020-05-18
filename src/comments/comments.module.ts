import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentRepository } from './comments.repository';
import { AuthModule } from '../auth/auth.module';
import { UserActivityModule } from 'src/user-activity/user-activity.module';
import { TasksModule } from 'src/tasks/tasks.module';
import { UserActivityRepository } from 'src/user-activity/user-activity.repository';
import { TaskRepository } from 'src/tasks/tasks.repository';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService],
  imports: [
    TypeOrmModule.forFeature([
      CommentRepository,
      UserActivityRepository,
      TaskRepository,
    ]),
    AuthModule,
    UserActivityModule,
    TasksModule,
  ],
})
export class CommentsModule {}
