import { ICustomer } from '../ICustomer';
import { IProduct } from './IProducts';

export interface ICreateOrderProducts {
  product_id: string;
  price: number;
  quantity: number;
}

export interface IOrder {
  id: string;
  order: number;
  customer: ICustomer;
  order_products: ICreateOrderProducts[];
  created_at: Date;
  updated_at: Date;
}

export interface IOrderProducts {
  id: string;
  order: IOrder;
  product: IProduct;
  price: number;
  quantity: number;
  created_at: Date;
  updated_at: Date;
}

export interface IFindProducts {
  id: string;
}

export interface ICreateProduct {
  name: string;
  price: number;
  quantity: number;
}

export interface IUpdateStockProduct {
  id: string;
  quantity: number;
}

export interface IProductPaginate {
  per_page: number;
  total: number;
  current_page: number;
  data: IProduct[];
}
