import { IsNotEmpty } from 'class-validator';

export class PaginationParams {
  @IsNotEmpty()
  public limit: number;

  @IsNotEmpty()
  public offset: number;
}
