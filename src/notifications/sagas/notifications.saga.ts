import { Injectable } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AddNotificationCommand } from '../commands/implementations/add-notification.command';
import { CommentCreatedEvent } from '../../comments/events/implementations/comment-created.event';
import { UserVotedEvent } from '../../votes/events/implementations/user-voted.event';

@Injectable()
export class NotificationsSaga {
  @Saga()
  notificationCreated = (
    events$: Observable<UserVotedEvent | CommentCreatedEvent>,
  ): Observable<ICommand> => {
    return events$.pipe(
      ofType(UserVotedEvent, CommentCreatedEvent),
      map((event) => new AddNotificationCommand(event.payload)),
    );
  };
}
