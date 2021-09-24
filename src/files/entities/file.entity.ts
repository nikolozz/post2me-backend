import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class File {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public key: string;

  @Column()
  public url: string;

  @OneToOne(() => User, (user: User) => user.avatar)
  public owner: User;

  @RelationId((file: File) => file.owner)
  public ownerId: number;
}
