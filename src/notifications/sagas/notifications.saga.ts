import { Injectable } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreateNotificationEvent } from '../events/implementations/create-notification.event';
import { AddNotificationCommand } from '../commands/implementations/add-notification.command';

@Injectable()
export class NotificationsSaga {
  @Saga()
  notificationCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(CreateNotificationEvent),
      map(
        event =>
          new AddNotificationCommand(event.userId, event.notifierId, event.type, event.postId),
      ),
    );
  };
}
