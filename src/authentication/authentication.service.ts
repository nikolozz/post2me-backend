import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { PostgresErrorCode } from '../database/enums/postgres-error-codes.enum';
import { RoleEnum } from '../users/enums/role.enums';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const SALT = 10;
    const hashedPassword = await bcrypt.hash(registerDto.password, SALT);
    try {
      const createdUser = await this.usersService.create({
        ...registerDto,
        password: hashedPassword,
      });
      return createdUser;
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException(
          'User with that username already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  login({ id, role }: { id: number; role: RoleEnum }) {
    const payload: JwtPayload = { id, role };
    return this.jwtService.sign(payload);
  }

  async getAuthenticatedUser(username: string, password: string) {
    const user = await this.usersService.getByUsername(username);
    await this.validatePassword(password, user?.password);
    return user;
  }

  private async validatePassword(
    password: string,
    encrypted: string | undefined,
  ) {
    const isPasswordMatch = await bcrypt.compare(password, encrypted);
    if (!isPasswordMatch) {
      throw new NotFoundException(
        'User with this username and password does not exists.',
      );
    }
  }
}
