import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(16)
  public username: string;

  @IsNotEmpty()
  public password: string;
}
