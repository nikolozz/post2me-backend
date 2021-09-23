import { UserInterface } from '../../users/interfaces/user.interface';

export interface RequestWithUserInterface extends Request {
  user: UserInterface;
}
