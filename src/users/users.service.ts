import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import { FilesService } from '../files/files.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly filesService: FilesService,
    private readonly usersRepository: UsersRepository,
  ) {}

  create(user: CreateUserDto) {
    return this.usersRepository.create(user);
  }

  getByUsername(username: string) {
    return this.usersRepository.getByUsername(username);
  }

  async addAvatar(username: string, buffer: Buffer, fileName: string) {
    const user = await this.getByUsername(username);
    if (!user) {
      throw new NotFoundException(`User ${username} is not found`);
    }
    await this.filesService.uploadFile(user.id, buffer, fileName);
  }
}
