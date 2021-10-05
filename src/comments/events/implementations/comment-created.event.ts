import { CommentCreatedPayload } from '../../interfaces/comment-created.payload';

export class CommentCreatedEvent {
  constructor(public payload: CommentCreatedPayload) {}
}
