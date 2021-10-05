import { NotificationTypesEnum } from '../enums/notification-types.enum';

export interface AddNotificationPayload {
  authorId: number;
  postId: number;
  type: NotificationTypesEnum;
}
