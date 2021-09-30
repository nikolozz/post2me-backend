import { Repository } from 'typeorm';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCommentCommand } from '../implementations/create-comment.command';
import { Comment } from '../../entities/comment.entity';
import { CreateNotificationEvent } from '../../../notifications/events/implementations/create-notification.event';
import { NotificationTypesEnum } from '../../../notifications/enums/notification-types.enum';
import { PostsService } from '../../../posts/posts.service';

@CommandHandler(CreateCommentCommand)
export class CreateCommandHandler
  implements ICommandHandler<CreateCommentCommand> {
  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
    private readonly eventBus: EventBus,
    private readonly postsService: PostsService,
  ) {}

  async execute(command: CreateCommentCommand) {
    const { content, postId, authorId } = command;
    const newComment = this.commentsRepository.create({
      content,
      author: { id: authorId },
      post: { id: postId },
    });
    const {
      author: { id },
    } = await this.postsService.getPost(postId);
    if (id !== authorId) {
      await this.eventBus.publish(
        new CreateNotificationEvent(
          id,
          authorId,
          NotificationTypesEnum.Comment,
          postId,
        ),
      );
    }
    await this.commentsRepository.save(newComment);
    return newComment;
  }
}
