import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginationParams } from 'src/common/types/pagination-params.interface';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsRepository } from './posts.repository';
import { UsersService } from '../users/users.service';

@Injectable()
export class PostsService {
  constructor(
    private readonly postsRepository: PostsRepository,
    private readonly usersService: UsersService,
  ) {}

  getAllPosts(paginationParams?: PaginationParams) {
    return this.postsRepository.getAllPosts(paginationParams);
  }

  getPost(postId: number) {
    return this.postsRepository.getPost(postId);
  }

  async create(post: CreatePostDto, username: string) {
    const author = await this.usersService.getByUsername(username);
    return this.postsRepository.create({
      ...post,
      author,
    });
  }

  async update(postId: number, username: string, postBody: CreatePostDto) {
    const { id } = await this.usersService.getByUsername(username);
    const post = await this.postsRepository.getPost(postId);
    if (post?.authorId !== id) {
      throw new NotFoundException(postId);
    }
    return this.postsRepository.update(postId, postBody);
  }

  async delete(postId: number, username: string) {
    const { id } = await this.usersService.getByUsername(username);
    const post = await this.postsRepository.getPost(postId);
    if (post?.authorId !== id) {
      throw new NotFoundException(postId);
    }
    return this.postsRepository.delete(postId);
  }
}
