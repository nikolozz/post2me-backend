import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { GetCommentsQuery } from '../implementations/get-comments.query';
import { Comment } from '../../entities/comment.entity';
import { Repository } from 'typeorm';

@QueryHandler(GetCommentsQuery)
export class GetCommentsHandler implements IQueryHandler<GetCommentsQuery> {
  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
  ) {}

  async execute(query: GetCommentsQuery) {
    return this.commentsRepository.find({
      where: { post: { id: query.postId } },
    });
  }
}
