import { RoleEnum } from '../../users/enums/role.enums';

export interface JwtPayload {
  id: number;
  role: RoleEnum;
}
