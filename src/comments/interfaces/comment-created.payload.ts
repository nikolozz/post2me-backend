import { NotificationTypesEnum } from '../../notifications/enums/notification-types.enum';

export interface CommentCreatedPayload {
  readonly authorId: number;
  readonly postId: number;
  readonly type: NotificationTypesEnum;
}
