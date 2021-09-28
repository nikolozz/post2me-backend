import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { MAX_USERNAME_LENGTH } from '../../users/constants';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(MAX_USERNAME_LENGTH)
  public username: string;

  @IsNotEmpty()
  public password: string;

  @IsNotEmpty()
  public confirmPassword: string;
}
