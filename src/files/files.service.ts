import { Injectable } from '@nestjs/common';
import { InjectAwsService } from '../aws/decorators/inject-aws-service.decorator';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
import { S3 } from 'aws-sdk';
import { FilesRepository } from './files.repository';

@Injectable()
export class FilesService {
  constructor(
    @InjectAwsService(S3) private readonly s3Service: S3,
    private readonly filesRepository: FilesRepository,
    private readonly configService: ConfigService,
  ) {}

  async uploadFile(userId: number, imageBuffer: Buffer, fileName: string) {
    const { Location, Key } = await this.s3Service
      .upload({
        Bucket: this.configService.get('PUBLIC_BUCKET'),
        Body: imageBuffer,
        Key: `${uuidv4()}-${fileName}`,
      })
      .promise();
    const file = await this.filesRepository.create(Location, Key, userId);
    return file;
  }
}
