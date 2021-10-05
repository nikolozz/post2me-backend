import { NotificationTypesEnum } from '../../notifications/enums/notification-types.enum';

export interface UserVotedPayload {
  readonly authorId: number;
  readonly postId: number;
  readonly type: NotificationTypesEnum;
}
