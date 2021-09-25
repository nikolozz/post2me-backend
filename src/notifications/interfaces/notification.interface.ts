import { NotificationTypesEnum } from '../enums/notification-types.enum';

export interface INotification {
  readonly userId: number;
  readonly notifierId: number;
  readonly type: NotificationTypesEnum;
  readonly postId: number | null;
}
