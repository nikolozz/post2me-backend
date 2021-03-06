import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { MAX_USERNAME_LENGTH } from '../constants';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(MAX_USERNAME_LENGTH)
  public username: string;

  @IsOptional()
  @IsString()
  public bio?: string;

  @IsNotEmpty()
  public password: string;
}
