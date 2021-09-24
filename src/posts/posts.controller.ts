import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Req,
  Patch,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { PaginationParams } from '../common/types/pagination-params.interface';
import { CreatePostDto } from './dto/create-post.dto';
import { IRequestWithUser } from '../authentication/interfaces/request-with-user.interface';
import { JwtAuthenticationGuard } from '../authentication/guards/jwt-authentication.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getAllPosts(@Query() paginationParams?: PaginationParams) {
    return this.postsService.getAllPosts(paginationParams);
  }

  @Get(':postId')
  getPost(@Param('postId') postId: number) {
    return this.postsService.getPost(postId);
  }

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  create(@Body() post: CreatePostDto, @Req() request: IRequestWithUser) {
    return this.postsService.create(post, request.user.id);
  }

  @Patch(':postId')
  @UseGuards(JwtAuthenticationGuard)
  async update(
    @Param('postId') postId: number,
    @Body() postBody: CreatePostDto,
    @Req() request: IRequestWithUser,
  ) {
    return this.postsService.update(postId, request.user.id, postBody);
  }

  @Delete(':postId')
  @UseGuards(JwtAuthenticationGuard)
  async delete(
    @Param('postId') postId: number,
    @Req() request: IRequestWithUser,
  ) {
    return this.postsService.delete(postId, request.user.id);
  }
}
