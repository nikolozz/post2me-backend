import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { NotificationType } from './notification-type.entity';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'bool', default: false })
  public isViewed: boolean;

  @ManyToOne(() => NotificationType, { eager: true })
  public type: NotificationType;

  @ManyToOne(() => User, { eager: true })
  public user: User;

  @ManyToOne(() => User, { eager: true })
  public notifier: User;

  @CreateDateColumn()
  public createdAt: Date;
}
