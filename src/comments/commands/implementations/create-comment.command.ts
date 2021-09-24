export class CreateCommentCommand {
  constructor(
    public readonly authorId: number,
    public readonly postId: number,
    public readonly content: string,
  ) {}
}
