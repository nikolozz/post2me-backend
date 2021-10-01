import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { NotificationType } from './entities/notification-type.entity';
import { NotificationsService } from './notifications.service';
import { CreateNotificationHandler } from './events/handlers/create-notification.handler';
import { AddNotificationHandler } from './commands/handlers/add-notification.handler';
import { NotificationsSaga } from './sagas/notifications.saga';
import { NotificationsRepository } from './notifications.repository';
import { NotificationsController } from './notifications.controller';
import { MarkNotificationsViewedHandler } from './commands/handlers/mark-notification-viewed.handler';
import { CqrsModule } from '@nestjs/cqrs';

const CommandHandlers = [
  AddNotificationHandler,
  MarkNotificationsViewedHandler,
];
const EventHandlers = [CreateNotificationHandler];

@Module({
  imports: [
    TypeOrmModule.forFeature([Notification, NotificationType]),
    CqrsModule,
  ],
  providers: [
    NotificationsService,
    NotificationsRepository,
    ...EventHandlers,
    ...CommandHandlers,
    NotificationsSaga,
  ],
  controllers: [NotificationsController],
})
export class NotificationsModule {}
