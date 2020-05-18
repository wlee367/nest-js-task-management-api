import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserActivityService } from './user-activity.service';
import { UserActivity } from './user-activity.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('user-activity')
@UseGuards(AuthGuard())
export class UserActivityController {
  constructor(private userActivityService: UserActivityService) {}

  @Get()
  getAllUserActivityForUser(@GetUser() user: User): Promise<UserActivity[]> {
    console.log(user);
    return this.userActivityService.getUserActivityByUser(user);
  }
}
