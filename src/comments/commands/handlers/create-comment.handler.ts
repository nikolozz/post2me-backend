import { Repository } from 'typeorm';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCommentCommand } from '../implementations/create-comment.command';
import { Comment } from '../../entities/comment.entity';

@CommandHandler(CreateCommentCommand)
export class CreateCommandHandler
  implements ICommandHandler<CreateCommentCommand> {
  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
  ) {}

  async execute(command: CreateCommentCommand) {
    const { content, postId, authorId } = command;
    const newComment = this.commentsRepository.create({
      content,
      author: { id: authorId },
      post: { id: postId },
    });
    await this.commentsRepository.save(newComment);
  }
}
