import { Exclude } from 'class-transformer';
import { RoleEnum } from '../enums/role.enums';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Post } from '../../posts/entities/post.entity';
import { File } from '../../files/entities/file.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true })
  public username: string;

  @Column()
  @Exclude()
  public password: string;

  @Column({
    type: 'enum',
    enum: RoleEnum,
    default: RoleEnum.USER,
  })
  @Exclude()
  public role: RoleEnum;

  @OneToMany(
    () => Post,
    (post: Post) => post.authorId,
  )
  public posts: Post[];

  @OneToOne(() => File, { eager: true, nullable: true })
  @JoinColumn()
  public avatar: File;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}
