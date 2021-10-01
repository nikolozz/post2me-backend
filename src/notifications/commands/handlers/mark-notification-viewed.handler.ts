import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotificationsService } from '../../notifications.service';
import { MarkNotificationsViewedCommand } from '../implementations/mark-notifications-viewed.command';

@CommandHandler(MarkNotificationsViewedCommand)
export class MarkNotificationsViewedHandler
  implements ICommandHandler<MarkNotificationsViewedCommand> {
  constructor(private readonly notificationsService: NotificationsService) {}

  execute(command: MarkNotificationsViewedCommand) {
    return this.notificationsService.markNotificatitionsViewedForUser(
      command.userId,
    );
  }
}
