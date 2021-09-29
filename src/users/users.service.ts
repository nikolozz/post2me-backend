import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { FilesService } from '../files/files.service';
import { Connection } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly filesService: FilesService,
    private readonly usersRepository: UsersRepository,
    private readonly connection: Connection,
  ) {}

  getUser(userId: number) {
    return this.usersRepository.getUserWithPosts(userId);
  }

  create(user: CreateUserDto) {
    return this.usersRepository.create(user);
  }

  async updateUser(id: number, updateBody: UpdateUserDto) {
    const user = await this.getById(id);
    return this.usersRepository.update(id, { ...user, ...updateBody });
  }

  async getById(id: number) {
    const user = this.usersRepository.getById(id);
    if (!user) {
      throw new NotFoundException(`User ${id} is not found.`);
    }
    return user;
  }

  async getByUsername(username: string) {
    const user = this.usersRepository.getByUsername(username);
    if (!user) {
      throw new NotFoundException(`User ${username} is not found.`);
    }
    return user;
  }

  async addAvatar(id: number, buffer: Buffer, fileName: string) {
    const user = await this.getById(id);
    if (user.avatar) {
      await this.deleteAvatar(id);
    }
    const avatar = await this.filesService.uploadFile(
      user.id,
      buffer,
      fileName,
    );
    await this.usersRepository.update(user.id, { ...user, avatar });
    return avatar;
  }

  async deleteAvatar(id: number) {
    const queryRunner = this.connection.createQueryRunner();

    const user = await this.getById(id);

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await Promise.all([
        this.usersRepository.deleteAvatarWithTransaction(user.id, queryRunner),
        this.filesService.deleteFileWithTransaction(
          user.id,
          user.avatar.id,
          queryRunner,
        ),
      ]);
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException({
        message: `Transaction Failed ${error?.message || error}`,
      });
    }
  }
}
