/* eslint-disable prettier/prettier */
/* eslint-disable import/no-extraneous-dependencies */
import { Exclude, Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('users')
export default class UsersEntitie {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  avatar: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    if(!this.avatar){
      return null
    }
    return `${process.env.APP_API_URL}/files/${this.avatar}`
  }

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
