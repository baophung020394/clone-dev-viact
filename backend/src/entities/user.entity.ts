// src/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { BaseModel } from './base.entity';

@Entity()
export class User extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  accessToken: string;

  @Column({ nullable: true })
  refreshToken: string;

  @Column({ nullable: true })
  role: string;

  // 0: inactive, 1: active
  @Column({ type: 'enum', enum: ['0', '1'], default: '1' })
  status: string;
}
