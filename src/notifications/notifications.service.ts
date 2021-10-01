import { Injectable } from '@nestjs/common';
import { INotification } from './interfaces/notification.interface';
import { NotificationsRepository } from './notifications.repository';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly notificationsRepository: NotificationsRepository,
  ) {}

  addNotification(command: INotification) {
    return this.notificationsRepository.create(command);
  }

  markNotificatitionsViewedForUser(id: number) {
    return this.notificationsRepository.markNotificationsReadForUser(id);
  }
}
