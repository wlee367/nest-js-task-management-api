import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepository } from './tasks.repository';
import { AuthModule } from 'src/auth/auth.module';
import { CommentRepository } from '../comments/comments.repository';
import { UserActivityRepository } from 'src/user-activity/user-activity.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TaskRepository,
      CommentRepository,
      UserActivityRepository,
    ]),
    AuthModule,
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
