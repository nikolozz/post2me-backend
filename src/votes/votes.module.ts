import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VotesService } from './votes.service';
import { VotesController } from './votes.controller';
import { VotesRepository } from './votes.repository';
import { Vote } from './entities/vote.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { AddVoteHandler } from './commands/handlers/add-vote.handler';
import { DeleteVoteHandler } from './commands/handlers/delete-vote.handler';
import { NotificationsModule } from '../notifications/notifications.module';
import { PostsModule } from '../posts/posts.module';

const CommandHandlers = [AddVoteHandler, DeleteVoteHandler];

@Module({
  imports: [
    TypeOrmModule.forFeature([Vote]),
    CqrsModule,
    NotificationsModule,
    PostsModule,
  ],
  controllers: [VotesController],
  providers: [VotesService, VotesRepository, ...CommandHandlers],
})
export class VotesModule {}
