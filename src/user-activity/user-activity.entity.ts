import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { User } from 'src/auth/user.entity';

@Entity()
export class UserActivity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column()
  date: Date;

  @ManyToOne(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    type => User,
    user => user.activity,
    { eager: false },
  )
  user: User;
}
