import { Repository, EntityRepository } from 'typeorm';
import { UserActivity } from './user-activity.entity';
import { CreateUserActivityDTO } from './dto/createUserActivityDTO';

@EntityRepository(UserActivity)
export class UserActivityRepository extends Repository<UserActivity> {
  async createUserActivity(
    createUserActivityDto: CreateUserActivityDTO,
  ): Promise<UserActivity> {
    const { user, description } = createUserActivityDto;

    const userActivity = new UserActivity();
    userActivity.user = user;
    userActivity.description = description;
    userActivity.date = new Date();

    await userActivity.save();

    return userActivity;
  }
}
