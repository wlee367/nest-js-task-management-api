import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserActivityRepository } from './user-activity.repository';
import { User } from 'src/auth/user.entity';
import { UserActivity } from './user-activity.entity';

@Injectable()
export class UserActivityService {
  constructor(
    @InjectRepository(UserActivityRepository)
    private userActivityRepository: UserActivityRepository,
  ) {}

  async getUserActivityByUser(user: User): Promise<UserActivity[]> {
    return this.userActivityRepository.findAllByUser(user);
  }
}
