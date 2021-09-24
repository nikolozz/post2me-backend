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
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateCommentCommand } from './commands/implementations/create-comment.command';
import { GetCommentsQuery } from './queries/implementations/get-comments.query';

@Controller('comments')
export class CommentsController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Get(':postId')
  getComments(@Param('postId') postId: number) {
    return this.queryBus.execute(new GetCommentsQuery(postId));
  }

  @Post('create')
  @UseGuards(JwtAuthenticationGuard)
  createComment(
    @Body() { content, postId }: CreateCommentDto,
    @Req() request: IRequestWithUser,
  ) {
    return this.commandBus.execute(
      new CreateCommentCommand(request.user.id, postId, content),
    );
  }
}
