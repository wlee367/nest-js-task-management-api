import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToMany,
} from 'typeorm';

import * as bcrypt from 'bcryptjs';
import { Task } from '../tasks/task.entity';
import { Comment } from '../comments/comments.entity';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  // one side of the relationship can be eager
  // meaning that if you load a user, you can immediately get a list of users
  // but if you look in the task entity, we set eager to false, that means the task
  // wont show the user it belongs to.
  @OneToMany(
    type => Task,
    task => task.user,
    { eager: true },
  )
  tasks: Task[];

  @OneToMany(
    type => Comment,
    comment => comment.user,
    { eager: true },
  )
  comment: Comment;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);

    return hash === this.password;
  }
}
