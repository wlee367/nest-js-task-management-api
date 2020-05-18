import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { CommentRepository } from './comments.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { Comment } from './comments.entity';
import { CreateCommentDTO } from './dto/create-comments.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentRepository)
    private commentsRepository: CommentRepository,
  ) {}

  async getCommentById(id: string, user: User): Promise<Comment> {
    const found = await this.commentsRepository.findOne({
      where: {
        id,
        user: user.id,
      },
    });

    if (!found) {
      throw new NotFoundException(`Comment with id ${id} was not found.`);
    }

    return found;
  }

  async createComment(
    createCommentDto: CreateCommentDTO,
    user: User,
  ): Promise<Comment> {
    return this.commentsRepository.createComment(createCommentDto, user);
  }

  async deleteComment(id: string, user: User): Promise<void> {
    const result = await this.commentsRepository.delete({
      id,
      userId: user.id,
    });

    if (result.affected === 0) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
  }

  async updateComment(
    commentId: string,
    commentText: string,
    user: User,
  ): Promise<Comment> {
    // const comment = await this.getCommentById(commentId, user);
    const comment = await this.commentsRepository.findOne({ id: commentId });

    const doesCommentBelongToUser = comment.userId === user.id;

    if (!doesCommentBelongToUser) {
      throw new ForbiddenException(
        'This comment does not belong to this user!',
      );
    }

    comment.commentText = commentText;
    comment.updatedAt = new Date();
    await comment.save();
    return comment;
  }
}
