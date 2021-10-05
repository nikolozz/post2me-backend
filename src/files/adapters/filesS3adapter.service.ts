import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectAwsService } from '../../aws/decorators/inject-aws-service.decorator';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
import { S3 } from 'aws-sdk';
import { FilesRepository } from '../files.repository';
import { QueryRunner } from 'typeorm';
import { FilesService } from '../files.service';

@Injectable()
export class FilesS3AdapterService implements FilesService {
  private bucket = this.configService.get('PUBLIC_BUCKET');

  constructor(
    @InjectAwsService(S3) private readonly s3Service: S3,
    private readonly filesRepository: FilesRepository,
    private readonly configService: ConfigService,
  ) {}

  async getFile(fileId: number) {
    return this.filesRepository.getFile(fileId);
  }

  async uploadFile(userId: number, imageBuffer: Buffer, fileName: string) {
    const { Location, Key } = await this.s3Service
      .upload({
        Bucket: this.bucket,
        Body: imageBuffer,
        Key: `${uuidv4()}-${fileName}`,
      })
      .promise();
    const file = await this.filesRepository.create(Location, Key, userId);
    return file;
  }

  async deleteFileWithTransaction(
    userId: number,
    fileId: number,
    queryRunner: QueryRunner,
  ) {
    const file = await this.filesRepository.getFile(fileId);
    if (file.ownerId !== userId) {
      throw new NotFoundException();
    }
    await Promise.all([
      this.s3Service.deleteObject({
        Bucket: this.bucket,
        Key: file.key,
      }),
      this.filesRepository.deleteWithTransaction(fileId, queryRunner),
    ]);
  }
}
