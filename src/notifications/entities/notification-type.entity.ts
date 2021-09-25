import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { NotificationTypesEnum } from '../enums/notification-types.enum';

@Entity()
export class NotificationType {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'enum', enum: NotificationTypesEnum })
  public type: NotificationTypesEnum;
}
