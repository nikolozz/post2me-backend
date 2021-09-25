export class AddVoteCommand {
  constructor(
    public readonly postId: number,
    public readonly ownerId: number,
  ) {}
}
