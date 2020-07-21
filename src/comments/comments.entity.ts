import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Entity,
} from 'typeorm';
import { User } from '../auth/user.entity';
import { Task } from '../tasks/task.entity';

@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  commentText: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @ManyToOne(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    type => User,
    user => user.tasks,
    { eager: true },
  )
  user: User;

  @Column()
  userId: string;

  @ManyToOne(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    type => Task,
    task => task.comment,
    { eager: false },
  )
  task: Task;

  @Column()
  taskId: string;
}
