import {
  Body,
  Controller,
  Delete,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { VotesService } from './votes.service';
import { IRequestWithUser } from '../authentication/interfaces/request-with-user.interface';
import { JwtAuthenticationGuard } from '../authentication/guards/jwt-authentication.guard';
import { Param } from '@nestjs/common';

@Controller('votes')
export class VotesController {
  constructor(private readonly votesService: VotesService) {}

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  addVote(
    @Body('postId', ParseIntPipe) postId: number,
    @Req() request: IRequestWithUser,
  ) {
    return this.votesService.addVote(postId, request.user.id);
  }

  @Delete(':postId')
  @UseGuards(JwtAuthenticationGuard)
  deleteVote(
    @Param('postId', ParseIntPipe) postId: number,
    @Req() request: IRequestWithUser,
  ) {
    return this.votesService.deleteVote(postId, request.user.id);
  }
}
