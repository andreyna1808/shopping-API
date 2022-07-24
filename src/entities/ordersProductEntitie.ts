/* eslint-disable import/no-extraneous-dependencies */
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import OrdersEntitie from './orderEntitie';
import ProductsEntitie from './productsEntitie';

@Entity('order_products')
export default class OrdersProductEntitie {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => OrdersEntitie, order => order.order_products)
  @JoinColumn({ name: 'order_id' })
  order: OrdersEntitie;

  @ManyToOne(() => ProductsEntitie, product => product.order_products)
  @JoinColumn({ name: 'product_id' })
  product: ProductsEntitie;

  @Column()
  order_id: string;

  @Column()
  product_id: string;

  @Column()
  price: number;

  @Column()
  quantity: number;

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
