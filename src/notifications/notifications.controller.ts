import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IRequestWithUser } from 'src/authentication/interfaces/request-with-user.interface';
import { JwtAuthenticationGuard } from '../authentication/guards/jwt-authentication.guard';
import { MarkNotificationsViewedCommand } from './commands/implementations/mark-notifications-viewed.command';

@Controller('notifications')
export class NotificationsController {
  constructor(private commandBus: CommandBus) {}

  @Get('mark')
  @UseGuards(JwtAuthenticationGuard)
  markNotificationsViewed(@Req() request: IRequestWithUser) {
    return this.commandBus.execute(
      new MarkNotificationsViewedCommand(request.user.id),
    );
  }
}
