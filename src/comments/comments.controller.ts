import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
  Delete,
  Patch,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Comment } from './comments.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { CreateCommentDTO } from './dto/create-comments.dto';

@Controller('comments')
@UseGuards(AuthGuard())
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Get('/:id')
  getCommentById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Comment> {
    return this.commentsService.getCommentById(id, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createComment(
    @Body() createCommentDTO: CreateCommentDTO,
    @GetUser() user: User,
  ): Promise<Comment> {
    return this.commentsService.createComment(createCommentDTO, user);
  }

  @Delete('/:id')
  deleteTask(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.commentsService.deleteComment(id, user);
  }

  @Patch('/:id')
  updateComment(
    @Param('id', ParseIntPipe) id: number,
    @Body('commentText') commentText: string,
    @GetUser() user: User,
  ): Promise<Comment> {
    return this.commentsService.updateComment(id, commentText, user);
  }
}
