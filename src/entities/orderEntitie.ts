/* eslint-disable import/no-extraneous-dependencies */
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import CustomersEntitie from './customersEntitie';
import OrdersProductEntitie from './ordersProductEntitie';

@Entity('orders')
export default class OrdersEntitie {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => CustomersEntitie)
  @JoinColumn({ name: 'customer_id' })
  customer: CustomersEntitie;

  @OneToMany(
    () => OrdersProductEntitie,
    order_products => order_products.order,
    { cascade: true },
  )
  order_products: OrdersProductEntitie[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
