import { Exclude } from 'class-transformer';
import { RoleEnum } from '../enums/role.enums';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  public id: string;

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

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}
