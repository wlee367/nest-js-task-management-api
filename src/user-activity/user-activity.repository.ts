import { Repository, EntityRepository } from 'typeorm';
import { UserActivity } from './user-activity.entity';

@EntityRepository(UserActivity)
export class UserActivityRepository extends Repository<UserActivity> {}
