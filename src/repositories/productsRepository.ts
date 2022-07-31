/* eslint-disable import/no-extraneous-dependencies */
import { getRepository, Repository, In } from 'typeorm';

import ProductsEntitie from '../entities/productsEntitie';
import {
  ICreateProduct,
  IFindProducts,
  IUpdateStockProduct,
} from '../interface/IProducts/interfaces';
import { IProductsRepository } from '../interface/IProducts/IProducts';

type SearchParams = {
  page: number;
  skip: number;
  take: number;
};

class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<ProductsEntitie>;

  constructor() {
    this.ormRepository = getRepository(ProductsEntitie);
  }

  public async create({ name, price, quantity }: ICreateProduct) {
    const product = this.ormRepository.create({ name, price, quantity });

    await this.ormRepository.save(product);

    return product;
  }

  public async save(product) {
    await this.ormRepository.save(product);

    return product;
  }

  public async remove(product) {
    await this.ormRepository.remove(product);
  }

  public async updateStock(products: IUpdateStockProduct[]) {
    await this.ormRepository.save(products);
  }

  public async findByName(name: string) {
    const product = this.ormRepository.findOne({
      name,
    });

    return product;
  }

  public async findById(id: string) {
    const product = this.ormRepository.findOne({ id });

    return product;
  }

  public async findAll({ page, skip, take }: SearchParams) {
    const [products, count] = await this.ormRepository
      .createQueryBuilder()
      .skip(skip)
      .take(take)
      .getManyAndCount();

    const result = {
      per_page: take,
      total: count,
      current_page: page,
      data: products,
    };

    return result;
  }

  public async findAllByIds(products: IFindProducts[]) {
    const productIds = products.map(product => product.id);

    const existentProducts = await this.ormRepository.find({
      where: {
        id: In(productIds),
      },
    });

    return existentProducts;
  }
}

export default ProductsRepository;
