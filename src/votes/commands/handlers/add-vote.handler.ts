import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AddVoteCommand } from '../implementations/add-vote.command';
import { VotesService } from '../../votes.service';

@CommandHandler(AddVoteCommand)
export class AddVoteHandler implements ICommandHandler<AddVoteCommand> {
  constructor(private readonly votesService: VotesService) {}

  execute(command: AddVoteCommand) {
    const { ownerId, postId } = command;
    return this.votesService.addVote(postId, ownerId);
  }
}
