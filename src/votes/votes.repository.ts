import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vote } from './entities/votes.entity';
import { IGetVote } from './interfaces/get-vote.interface';

@Injectable()
export class VotesRepository {
  constructor(
    @InjectRepository(Vote) private readonly votesRepository: Repository<Vote>,
  ) {}

  async getVote(vote: IGetVote) {
    const { postId, ownerId } = vote;
    return this.votesRepository.findOne({
      post: { id: postId },
      owner: { id: ownerId },
    });
  }

  async addVote(vote: IGetVote) {
    const { postId, ownerId } = vote;
    const newVote = this.votesRepository.create({
      post: { id: postId },
      owner: { id: ownerId },
    });
    await this.votesRepository.save(newVote);
    const [_, count] = await this.votesRepository.findAndCount({
      post: { id: postId },
    });
    return count;
  }

  async deleteVote(vote: IGetVote) {
    const { postId, ownerId } = vote;
    const deleteResponse = await this.votesRepository.delete({
      post: { id: postId },
      owner: { id: ownerId },
    });
    if (!deleteResponse.affected) {
      throw new NotFoundException(`Cannot remove vote`);
    }
  }
}
