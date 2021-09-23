import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(16)
  public username: string;

  @IsNotEmpty()
  public password: string;
}
