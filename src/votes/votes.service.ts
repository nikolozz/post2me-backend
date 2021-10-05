import { BadRequestException, Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { VotesRepository } from './votes.repository';
import { NotificationTypesEnum } from '../notifications/enums/notification-types.enum';
import { UserVotedEvent } from './events/implementations/user-voted.event';

@Injectable()
export class VotesService {
  constructor(
    private readonly votesRepository: VotesRepository,
    private readonly eventBus: EventBus,
  ) {}

  async addVote(postId: number, ownerId: number) {
    const vote = await this.votesRepository.getVote({ postId, ownerId });
    if (vote) {
      throw new BadRequestException(`User ${ownerId} Cannot vote twice`);
    }
    await this.eventBus.publish(
      new UserVotedEvent({
        authorId: ownerId,
        postId,
        type: NotificationTypesEnum.Vote,
      }),
    );
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
