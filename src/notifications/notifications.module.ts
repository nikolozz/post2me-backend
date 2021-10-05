import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { NotificationType } from './entities/notification-type.entity';
import { NotificationsService } from './notifications.service';
import { AddNotificationHandler } from './commands/handlers/add-notification.handler';
import { NotificationsSaga } from './sagas/notifications.saga';
import { NotificationsRepository } from './notifications.repository';
import { NotificationsController } from './notifications.controller';
import { MarkNotificationsViewedHandler } from './commands/handlers/mark-notification-viewed.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { PostsModule } from '../posts/posts.module';

const CommandHandlers = [
  AddNotificationHandler,
  MarkNotificationsViewedHandler,
];

@Module({
  imports: [
    TypeOrmModule.forFeature([Notification, NotificationType]),
    CqrsModule,
    PostsModule,
  ],
  providers: [
    NotificationsService,
    NotificationsRepository,
    ...CommandHandlers,
    NotificationsSaga,
  ],
  controllers: [NotificationsController],
})
export class NotificationsModule {}
