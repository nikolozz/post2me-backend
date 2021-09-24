import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { CommentsController } from './comments.controller';
import { CreateCommandHandler } from './commands/handlers/create-comment.handler';
import { Comment } from './entities/comment.entity';
import { GetCommentsHandler } from './queries/handlers/get-comments.handler';

const CommandHandlers = [CreateCommandHandler];
const QueryHandlers = [GetCommentsHandler];

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), CqrsModule],
  controllers: [CommentsController],
  providers: [...CommandHandlers, ...QueryHandlers],
})
export class CommentsModule {}
