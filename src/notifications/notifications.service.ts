import { Injectable } from '@nestjs/common';
import { PostsService } from '../posts/posts.service';
import { AddNotificationPayload } from './interfaces/add-notification.payload';
import { NotificationsRepository } from './notifications.repository';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly notificationsRepository: NotificationsRepository,
    private readonly postsService: PostsService,
  ) {}

  async addNotification(command: AddNotificationPayload) {
    const { authorId, type, postId } = command;
    const post = await this.postsService.getPost(postId);
    if (post.author.id === authorId) {
      return;
    }
    return this.notificationsRepository.create({
      userId: post.author.id,
      notifierId: authorId,
      type,
      postId,
    });
  }

  markNotificatitionsViewedForUser(id: number) {
    return this.notificationsRepository.markNotificationsReadForUser(id);
  }
}
