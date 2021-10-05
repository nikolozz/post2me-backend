import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsRepository {
  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
  ) {}

  getComments(postId: number) {
    return this.commentsRepository.find({
      where: { post: { id: postId } },
    });
  }

  create(authorId: number, postId: number, content: string) {
    const newComment = this.commentsRepository.create({
      content,
      author: { id: authorId },
      post: { id: postId },
    });
    return this.commentsRepository.save(newComment);
  }
}
