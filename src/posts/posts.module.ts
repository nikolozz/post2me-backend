import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PostsRepository } from './posts.repository';
import { UsersModule } from '../users/users.module';
import { Post } from './entities/post.entity';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([Post])],
  controllers: [PostsController],
  providers: [PostsService, PostsRepository],
  exports: [PostsService],
})
export class PostsModule {}
