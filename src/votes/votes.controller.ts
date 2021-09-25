import {
  Body,
  Controller,
  Delete,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { IRequestWithUser } from '../authentication/interfaces/request-with-user.interface';
import { JwtAuthenticationGuard } from '../authentication/guards/jwt-authentication.guard';
import { Param } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AddVoteCommand } from './commands/implementations/add-vote.command';
import { DeleteVoteCommand } from './commands/implementations/delete-vote.command';

@Controller('votes')
export class VotesController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  addVote(
    @Body('postId', ParseIntPipe) postId: number,
    @Req() request: IRequestWithUser,
  ) {
    return this.commandBus.execute(new AddVoteCommand(postId, request.user.id));
  }

  @Delete(':postId')
  @UseGuards(JwtAuthenticationGuard)
  deleteVote(
    @Param('postId', ParseIntPipe) postId: number,
    @Req() request: IRequestWithUser,
  ) {
    return this.commandBus.execute(
      new DeleteVoteCommand(postId, request.user.id),
    );
  }
}
