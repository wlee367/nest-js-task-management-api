import { Repository, EntityRepository, getManager } from 'typeorm';
import { UserActivity } from './user-activity.entity';
import { CreateUserActivityDTO } from './dto/createUserActivityDTO';
import { User } from 'src/auth/user.entity';

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

  async findAllByUser(user: User): Promise<UserActivity[]> {
    console.log(user);
    const userActivities = await getManager()
      .createQueryBuilder(UserActivity, 'user_activity')
      .where('user_activity.user = :id', { id: user.id })
      .getMany();

    return userActivities;
  }
}
