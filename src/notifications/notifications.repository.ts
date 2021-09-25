import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { NotificationType } from './entities/notification-type.entity';
import { INotification } from './interfaces/notification.interface';
import { NotificationTypesEnum } from './enums/notification-types.enum';

@Injectable()
export class NotificationsRepository {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
    @InjectRepository(NotificationType)
    private readonly notificationTypeRepository: Repository<NotificationType>,
  ) {}

  getNotificationType(type: NotificationTypesEnum) {
    return this.notificationTypeRepository.findOne({ type });
  }

  async create(notificationBody: INotification) {
    const { type, userId, notifierId } = notificationBody;
    const { id } = await this.getNotificationType(type);
    const notification = this.notificationRepository.create({
      user: { id: userId },
      type: { id },
      notifier: { id: notifierId },
    });
    await this.notificationRepository.save(notification);
    return notification;
  }
}
