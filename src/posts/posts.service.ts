import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginationParams } from '../common/types/pagination-params.interface';
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

  async create(post: CreatePostDto, id: number) {
    const author = await this.usersService.getById(id);
    return this.postsRepository.create({
      ...post,
      author,
    });
  }

  async update(postId: number, authorId: number, postBody: CreatePostDto) {
    const { id } = await this.usersService.getById(authorId);
    const post = await this.postsRepository.getPost(postId);
    if (post?.authorId !== id) {
      throw new NotFoundException(postId);
    }
    return this.postsRepository.update(postId, postBody);
  }

  async delete(postId: number, authorId: number) {
    const { id } = await this.usersService.getById(authorId);
    const post = await this.postsRepository.getPost(postId);
    if (post?.authorId !== id) {
      throw new NotFoundException(postId);
    }
    return this.postsRepository.delete(postId);
  }
}
