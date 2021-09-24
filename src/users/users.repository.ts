import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  getById(id: number) {
    return this.usersRepository.findOne(id);
  }

  getByUsername(username: string) {
    return this.usersRepository.findOne({ username });
  }

  async create(user: CreateUserDto) {
    const newUser = this.usersRepository.create(user);
    await this.usersRepository.save(newUser);
    return newUser;
  }

  update(userId: number, user: User) {
    return this.usersRepository.update(userId, user);
  }

  deleteAvatarWithTransaction(userId, queryRunner: QueryRunner) {
    return queryRunner.manager.update(User, userId, { avatar: null });
  }
}
