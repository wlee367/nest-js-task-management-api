import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { TaskStatus } from './task-status.enum';
import { User } from '../auth/user.entity';
import { Comment } from '../comments/comments.entity';

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;

  @ManyToOne(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    type => User,
    user => user.tasks,
    { eager: false },
  )
  user: User;

  @Column()
  userId: string;

  @OneToMany(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    type => Comment,
    comment => comment.task,
    { eager: true },
  )
  comment: Comment[];
}
