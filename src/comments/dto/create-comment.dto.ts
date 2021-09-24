import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  public content: string;

  @IsNumber()
  @IsNotEmpty()
  public postId: number;
}
