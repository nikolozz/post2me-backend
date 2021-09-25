import { BadRequestException, Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { VotesRepository } from './votes.repository';
import { CreateNotificationEvent } from '../notifications/events/implementations/create-notification.event';
import { NotificationTypesEnum } from '../notifications/enums/notification-types.enum';
import { PostsService } from '../posts/posts.service';

@Injectable()
export class VotesService {
  constructor(
    private readonly votesRepository: VotesRepository,
    private readonly postsService: PostsService,
    private readonly eventBus: EventBus,
  ) {}

  async addVote(postId: number, ownerId: number) {
    const vote = await this.votesRepository.getVote({ postId, ownerId });
    if (vote) {
      throw new BadRequestException(`User ${ownerId} Cannot vote twice`);
    }
    const {
      author: { id },
    } = await this.postsService.getPost(postId);
    if (id !== ownerId) {
      await this.eventBus.publish(
        new CreateNotificationEvent(
          id,
          ownerId,
          NotificationTypesEnum.Vote,
          postId,
        ),
      );
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
