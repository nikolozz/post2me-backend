import { UserVotedPayload } from '../../interfaces/user-voted.payload';

export class UserVotedEvent {
  constructor(public payload: UserVotedPayload) {}
}
