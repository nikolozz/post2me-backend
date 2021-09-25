import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AddNotificationCommand } from '../implementations/add-notification.command';
import { NotificationsService } from '../../notifications.service';

@CommandHandler(AddNotificationCommand)
export class AddNotificationHandler
  implements ICommandHandler<AddNotificationCommand> {
  constructor(private readonly notificationsService: NotificationsService) {}

  execute(command: AddNotificationCommand) {
    return this.notificationsService.addNotification(command);
  }
}
