import { IsNotEmpty } from 'class-validator';
import { User } from 'src/auth/user.entity';

export class CreateUserActivityDTO {
  @IsNotEmpty()
  user: User;

  @IsNotEmpty()
  description: string;
}
