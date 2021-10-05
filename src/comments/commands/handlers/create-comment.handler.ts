import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCommentCommand } from '../implementations/create-comment.command';
import { CommentsService } from '../../comments.service';

@CommandHandler(CreateCommentCommand)
export class CreateCommandHandler
  implements ICommandHandler<CreateCommentCommand> {
  constructor(private readonly commentsService: CommentsService) {}

  async execute(command: CreateCommentCommand) {
    const { content, postId, authorId } = command;
    return this.commentsService.createComment(authorId, postId, content);
  }
}
