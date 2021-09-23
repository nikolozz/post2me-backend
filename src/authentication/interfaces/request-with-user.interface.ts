import { UserInterface } from '../../users/interfaces/user.interface';
import { Request } from 'express';

export interface IRequestWithUser extends Request {
  user: UserInterface;
}
