import { inject, injectable } from 'tsyringe';

import { ICreateProduct } from '../../interface/IProducts/interfaces';
import { IProductsRepository } from '../../interface/IProducts/IProducts';
import { AppError } from '../../utils/appError';

@injectable()
class CreateProductsService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async create({ name, price, quantity }: ICreateProduct) {
    const productExists = await this.productsRepository.findByName(name);

    if (productExists) {
      throw new AppError('There is already one product with this name');
    }

    const product = await this.productsRepository.create({
      name,
      price,
      quantity,
    });

    return product;
  }
}
export { CreateProductsService };
