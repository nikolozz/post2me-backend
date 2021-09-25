import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { VotesService } from '../../votes.service';
import { DeleteVoteCommand } from '../implementations/delete-vote.command';

@CommandHandler(DeleteVoteCommand)
export class DeleteVoteHandler implements ICommandHandler<DeleteVoteCommand> {
  constructor(private readonly votesService: VotesService) {}

  execute(command: DeleteVoteCommand) {
    const { ownerId, postId } = command;
    return this.votesService.deleteVote(postId, ownerId);
  }
}
