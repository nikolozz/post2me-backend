import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Comment } from '../../comments/entities/comment.entity';
import { Vote } from '../../votes/entities/votes.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public title: string;

  @Column('text')
  public content: string;

  @ManyToOne(
    () => User,
    (user: User) => user.posts,
    { eager: true },
  )
  public author: User;

  @RelationId((post: Post) => post.author)
  public authorId?: number;

  @OneToMany(
    () => Comment,
    (comment: Comment) => comment.post,
    { eager: true },
  )
  public comments?: Comment[];

  @OneToMany(() => Vote, (vote: Vote) => vote.post)
  public votes?: Vote[];

  @CreateDateColumn()
  public createdAt?: Date;

  @UpdateDateColumn()
  public updatedAt?: Date;
}
