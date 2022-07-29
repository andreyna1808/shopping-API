import { ICustomer } from './ICustomer';
import { ICreateOrderProducts } from './IProducts/interfaces';
import { IProduct } from './IProducts/IProducts';

type SearchParams = {
  page: number;
  skip: number;
  take: number;
};

export interface ICreateOrder {
  customer: ICustomer;
  products: ICreateOrderProducts[];
}

export interface IOrder {
  id: string;
  order: number;
  customer: ICustomer;
  order_products: ICreateOrderProducts[];
  created_at: Date;
  updated_at: Date;
}

export interface IOrderPaginate {
  per_page: number;
  total: number;
  current_page: number;
  data: IOrder[];
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

export interface IRequestCreateOrder {
  customer_id: string;
  products: IProduct[];
}

export interface IOrdersRepository {
  findById(id: string);
  findAll({ page, skip, take }: SearchParams);
  create(data: ICreateOrder);
}
