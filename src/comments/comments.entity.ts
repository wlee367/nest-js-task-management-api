import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Entity,
} from 'typeorm';
import { User } from 'src/auth/user.entity';
import { Task } from 'src/tasks/task.entity';

@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

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
    { eager: false },
  )
  user: User;

  @Column()
  userId: number;

  @ManyToOne(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    type => Task,
    task => task.comment,
    { eager: false },
  )
  task: Task;

  @Column()
  taskId: number;
}
