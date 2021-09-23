import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  create(user: CreateUserDto) {
    return this.usersRepository.create(user);
  }

  getByUsername(username: string) {
    return this.usersRepository.getByUsername(username);
  }
}
