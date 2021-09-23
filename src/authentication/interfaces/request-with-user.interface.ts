import { UserInterface } from '../../users/interfaces/user.interface';
import { Request } from 'express';

export interface RequestWithUserInterface extends Request {
  user: UserInterface;
}
