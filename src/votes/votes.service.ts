import { BadRequestException, Injectable } from '@nestjs/common';
import { VotesRepository } from './votes.repository';

@Injectable()
export class VotesService {
  constructor(private readonly votesRepository: VotesRepository) {}

  async addVote(postId: number, ownerId: number) {
    const vote = await this.votesRepository.getVote({ postId, ownerId });
    if (vote) {
      throw new BadRequestException(`User ${ownerId} Cannot vote twice`);
    }
    return this.votesRepository.addVote({ postId, ownerId });
  }

  async deleteVote(postId: number, ownerId: number) {
    const vote = await this.votesRepository.getVote({ postId, ownerId });
    if (!vote) {
      throw new BadRequestException(`User ${ownerId} does not voted`);
    }
    return this.votesRepository.deleteVote({ postId, ownerId });
  }
}
