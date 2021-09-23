import { RoleEnum } from '../../users/enums/role.enums';

export interface JwtPayload {
  username: string;
  role: RoleEnum;
}
