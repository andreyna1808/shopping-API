import {
  ICreateProduct,
  IFindProducts,
  IOrderProducts,
  IUpdateStockProduct,
} from './interfaces';

type SearchParams = {
  page: number;
  skip: number;
  take: number;
};

export interface IProduct {
  id: string;
  order_products?: IOrderProducts[];
  name: string;
  price: number;
  quantity: number;
  created_at: Date;
  updated_at: Date;
}

export interface IProductsRepository {
  findByName(name: string);
  findById(id: string);
  findAll({ page, skip, take }: SearchParams);
  findAllByIds(products: IFindProducts[]);
  create(data: ICreateProduct);
  save(product: IProduct);
  updateStock(products: IUpdateStockProduct[]);
  remove(product: IProduct);
}
