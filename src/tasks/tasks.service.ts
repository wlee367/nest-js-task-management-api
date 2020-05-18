import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { User } from '../auth/user.entity';
import { CommentRepository } from '../comments/comments.repository';
import { UserActivityRepository } from 'src/user-activity/user-activity.repository';
import { CreateUserActivityDTO } from 'src/user-activity/dto/createUserActivityDTO';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository) private taskRepository: TaskRepository,
    @InjectRepository(CommentRepository)
    private commentRepository: CommentRepository,
    @InjectRepository(UserActivityRepository)
    private userActivityRepository: UserActivityRepository,
  ) {}

  async getTasks(filterDto: GetTasksFilterDTO, user: User): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto, user);
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    const found = await this.taskRepository.findOne({
      where: { id, userId: user.id },
    });

    if (!found) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return found;
  }

  async createTask(createTaskDto: CreateTaskDTO, user: User): Promise<Task> {
    const createUserActivity = new CreateUserActivityDTO();
    createUserActivity.user = user;
    createUserActivity.description = `${user.username} created a new task called: ${createTaskDto.title}`;
    await this.userActivityRepository.createUserActivity(createUserActivity);
    return this.taskRepository.createTask(createTaskDto, user);
  }

  async deleteTask(id: string, user: User): Promise<void> {
    const taskToDelete = await this.getTaskById(id, user);

    const createUserActivity = new CreateUserActivityDTO();
    createUserActivity.user = user;
    createUserActivity.description = `${user.username} deleted a ${taskToDelete.title}`;
    await this.userActivityRepository.createUserActivity(createUserActivity);

    const result = await this.taskRepository.delete({ id, userId: user.id });
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }

  async updateTaskStatus(
    id: string,
    status: TaskStatus,
    user: User,
  ): Promise<Task> {
    const task = await this.getTaskById(id, user);
    task.status = status;
    await task.save();

    const createUserActivity = new CreateUserActivityDTO();
    createUserActivity.user = user;
    createUserActivity.description = `${user.username} moved the ${task.title} to ${task.status}`;
    await this.userActivityRepository.createUserActivity(createUserActivity);

    return task;
  }
}
