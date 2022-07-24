/* eslint-disable import/no-extraneous-dependencies */
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import UsersEntitie from './usersEntitie';

@Entity('tokens')
export default class TokenEntitie {
  @PrimaryColumn()
  id: string;

  @Column()
  token: string;

  @JoinColumn({ name: 'user_id' }) // Onde será feito a foreignKey
  @OneToOne(() => UsersEntitie) // Primeiro a entidade que estamos e depois o User que é One
  users: UsersEntitie; // De onde receberemos a foreignKeys

  @Column()
  user_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
    if (!this.token) {
      this.token = uuid();
    }
  }
}
