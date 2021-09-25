import { CreateNotificationEvent } from '../implementations/create-notification.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(CreateNotificationEvent)
export class CreateNotificationHandler
  implements IEventHandler<CreateNotificationEvent> {
  handle(event: CreateNotificationEvent) {
    // @TODO Sent SSE notificationEvent to FE
  }
}
