export class DeleteVoteCommand {
  constructor(
    public readonly postId: number,
    public readonly ownerId: number,
  ) {}
}
