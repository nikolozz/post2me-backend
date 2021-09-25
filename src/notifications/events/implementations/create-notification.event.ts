import { NotificationTypesEnum } from '../../enums/notification-types.enum';

export class CreateNotificationEvent {
  constructor(
    public userId: number,
    public notifierId: number,
    public type: NotificationTypesEnum,
    public postId: number | null,
  ) {}
}
