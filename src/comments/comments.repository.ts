import { Comment } from './comments.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateCommentDTO } from './dto/create-comments.dto';
import { User } from 'src/auth/user.entity';

@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment> {
  async createComment(
    createCommentDTO: CreateCommentDTO,
    user: User,
  ): Promise<Comment> {
    const { commentText, taskId } = createCommentDTO;

    const comment = this.create();
    comment.commentText = commentText;
    comment.user = user;
    comment.createdAt = new Date();
    comment.updatedAt = new Date();
    comment.taskId = taskId;

    await comment.save();

    return comment;
  }
}
