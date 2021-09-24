import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { PaginationParams } from '../common/types/pagination-params.interface';

@Injectable()
export class PostsRepository {
  constructor(
    @InjectRepository(Post) private readonly postsRepository: Repository<Post>,
  ) {}

  getAllPosts(paginationParams?: PaginationParams) {
    return this.postsRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.votes', 'vote')
      .leftJoinAndSelect('post.comments', 'comment')
      .leftJoinAndSelect('post.author', 'user')
      .leftJoinAndSelect('user.avatar', 'file')
      .loadRelationCountAndMap('post.votes', 'post.votes')
      .skip(paginationParams?.offset)
      .take(paginationParams?.limit)
      .orderBy('post.id', 'ASC')
      .getMany();
  }

  getPost(postId: number) {
    return this.postsRepository.findOne(postId);
  }

  async create(post: Post) {
    const newPost = this.postsRepository.create(post);
    await this.postsRepository.save(newPost);
    return newPost;
  }

  async update(postId: number, post: CreatePostDto) {
    await this.postsRepository.update(postId, post);
    const updatedPost = await this.getPost(postId);
    if (!updatedPost) {
      throw new NotFoundException(`Post ${postId} is not found`);
    }
    return updatedPost;
  }

  async delete(postId: number) {
    const deleteResponse = await this.postsRepository.delete(postId);
    if (!deleteResponse.affected) {
      throw new NotFoundException(`Cannot find post`);
    }
  }
}
