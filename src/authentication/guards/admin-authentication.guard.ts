import { CanActivate, ExecutionContext } from '@nestjs/common';
import { RoleEnum } from '../../users/enums/role.enums';
import { RequestWithUserInterface } from '../interfaces/request-with-user.interface';

export class AdminAuthenticationGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request: RequestWithUserInterface = context
      .switchToHttp()
      .getRequest();
    const { role } = request.user;
    if (role !== RoleEnum.ADMIN) {
      return false;
    }
    return true;
  }
}
