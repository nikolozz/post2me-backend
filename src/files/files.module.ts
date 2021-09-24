import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './entities/file.entity';
import { FilesRepository } from './files.repository';
import { FilesService } from './files.service';
import { ConfigModule } from '@nestjs/config';
import { AwsModule } from '../aws/aws.module';
import { S3 } from 'aws-sdk';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([File]),
    AwsModule.forFeature([S3]),
  ],
  providers: [FilesService, FilesRepository],
  exports: [FilesService],
})
export class FilesModule {}
