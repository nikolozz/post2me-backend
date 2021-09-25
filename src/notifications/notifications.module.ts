import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { NotificationType } from './entities/notification-type.entity';
import { NotificationsService } from './notifications.service';
import { CreateNotificationHandler } from './events/handlers/create-notification.handler';
import { AddNotificationHandler } from './commands/handlers/add-notification.handler';
import { NotificationsSaga } from './sagas/notifications.saga';
import { NotificationsRepository } from './notifications.repository';

const CommandHandlers = [AddNotificationHandler];
const EventHandlers = [CreateNotificationHandler];

@Module({
  imports: [TypeOrmModule.forFeature([Notification, NotificationType])],
  providers: [
    NotificationsService,
    NotificationsRepository,
    ...EventHandlers,
    ...CommandHandlers,
    NotificationsSaga,
  ],
})
export class NotificationsModule {}
