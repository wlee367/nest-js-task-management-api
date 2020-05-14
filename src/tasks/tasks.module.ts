import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepository } from './tasks.repository';
import { AuthModule } from 'src/auth/auth.module';
import { CommentRepository } from 'src/comments/comments.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskRepository, CommentRepository]),
    AuthModule,
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
