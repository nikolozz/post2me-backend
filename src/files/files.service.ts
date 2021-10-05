import { QueryRunner } from 'typeorm';
import { File } from './entities/file.entity';

export abstract class FilesService {
  abstract getFile(fileId: number): Promise<File>;

  abstract uploadFile(userId: number, imageBuffer: Buffer, fileName: string): Promise<File>;

  abstract deleteFileWithTransaction(
    userId: number,
    fileId: number,
    queryRunner: QueryRunner,
  ): Promise<void>;
}
