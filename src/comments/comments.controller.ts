import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthenticationGuard } from '../authentication/guards/jwt-authentication.guard';
import { CreateCommentDto } from './dto/create-comment.dto';
import { IRequestWithUser } from '../authentication/interfaces/request-with-user.interface';
import { CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get(':postId')
  getComments(@Param('postId') postId: number) {
    return this.commentsService.getComments(postId);
  }

  @Post('create')
  @UseGuards(JwtAuthenticationGuard)
  createComment(
    @Body() { content, postId }: CreateCommentDto,
    @Req() request: IRequestWithUser,
  ) {
    return this.commentsService.createComment(request.user.id, postId, content);
  }
}
