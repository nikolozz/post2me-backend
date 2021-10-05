import { Injectable } from '@nestjs/common';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import { NotificationTypesEnum } from 'src/notifications/enums/notification-types.enum';
import { CreateCommentCommand } from './commands/implementations/create-comment.command';
import { CommentsRepository } from './comments.repository';
import { CommentCreatedEvent } from './events/implementations/comment-created.event';
import { GetCommentsQuery } from './queries/implementations/get-comments.query';

@Injectable()
export class CommentsService {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
    private eventBus: EventBus,
    private readonly commentsRepository: CommentsRepository,
  ) {}

  publishGetCommentsQuery(postId: number) {
    return this.queryBus.execute(new GetCommentsQuery(postId));
  }

  publishCreateCommentCommand(id: number, postId: number, content: string) {
    return this.commandBus.execute(
      new CreateCommentCommand(id, postId, content),
    );
  }

  async getComments(postId: number) {
    return this.commentsRepository.getComments(postId);
  }

  async createComment(authorId: number, postId: number, content: string) {
    const newComment = this.commentsRepository.create(
      authorId,
      postId,
      content,
    );

    await this.eventBus.publish(
      new CommentCreatedEvent({
        authorId,
        postId,
        type: NotificationTypesEnum.Comment,
      }),
    );
      
    return newComment;
  }
}
