import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from '../../posts/entities/post.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Vote {
  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToOne(
    () => Post,
    (post: Post) => post.votes,
    { eager: true, onDelete: 'CASCADE' },
  )
  public post: Post;

  @ManyToOne(() => User, { eager: true })
  public owner: User;
}
