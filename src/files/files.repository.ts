import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './entities/file.entity';

@Injectable()
export class FilesRepository {
  constructor(
    @InjectRepository(File) private readonly filesRepository: Repository<File>,
  ) {}

  async create(url: string, key: string, ownerId: number) {
    const newFile = this.filesRepository.create({
      url,
      key,
      owner: {
        id: ownerId,
      },
    });
    await this.filesRepository.save(newFile);
    return newFile;
  }
}
