import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCommentsQuery } from '../implementations/get-comments.query';
import { CommentsService } from 'src/comments/comments.service';

@QueryHandler(GetCommentsQuery)
export class GetCommentsHandler implements IQueryHandler<GetCommentsQuery> {
  constructor(private readonly commentsService: CommentsService) {}

  async execute({ postId }: GetCommentsQuery) {
    return this.commentsService.getComments(postId);
  }
}
