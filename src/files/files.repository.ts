import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { File } from './entities/file.entity';

@Injectable()
export class FilesRepository {
  constructor(
    @InjectRepository(File) private readonly filesRepository: Repository<File>,
  ) {}

  getFile(id: number) {
    return this.filesRepository.findOne(id);
  }

  async create(url: string, key: string, userId: number) {
    const newFile = this.filesRepository.create({
      url,
      key,
      owner: { id: userId },
    });
    await this.filesRepository.save(newFile);
    return newFile;
  }

  async deleteWithTransaction(id: number, queryRunner: QueryRunner) {
    const deleteResponse = await queryRunner.manager.delete(File, id);
    if (!deleteResponse) {
      throw new NotFoundException(`File ${id} is not found`);
    }
  }
}
