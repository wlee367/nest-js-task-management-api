import { IsNotEmpty } from 'class-validator';

export class CreateCommentDTO {
  @IsNotEmpty()
  commentText: string;

  @IsNotEmpty()
  taskId: number;
}
