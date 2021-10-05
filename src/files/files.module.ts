import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './entities/file.entity';
import { FilesRepository } from './files.repository';
import { FilesService } from './files.service';
import { ConfigModule } from '@nestjs/config';
import { AwsModule } from '../aws/aws.module';
import { S3 } from 'aws-sdk';
import { FilesS3AdapterService } from './adapters/filesS3adapter.service';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([File]),
    AwsModule.forFeature([S3]),
  ],
  providers: [
    { provide: FilesService, useClass: FilesS3AdapterService },
    FilesRepository,
  ],
  exports: [FilesService],
})
export class FilesModule {}
