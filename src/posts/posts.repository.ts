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

  getAllPosts(paginationParams: PaginationParams) {
    const { offset, limit } = paginationParams;
    return this.postsRepository.find({
      take: limit,
      skip: offset,
      relations: ['votes'],
    });
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
