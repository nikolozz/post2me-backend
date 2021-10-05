import { AddNotificationPayload } from '../../interfaces/add-notification.payload';

export class AddNotificationCommand {
  constructor(public payload: AddNotificationPayload) {}
}
