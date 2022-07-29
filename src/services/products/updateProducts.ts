import { inject, injectable } from 'tsyringe';

import { IProductsRepository } from '../../interface/IProducts/IProducts';
import { AppError } from '../../utils/appError';

interface IProducts {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

@injectable()
class UpdateProductsService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async update({ id, name, price, quantity }: IProducts) {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new AppError('Product not found.');
    }

    const productExists = await this.productsRepository.findByName(name);

    if (productExists) {
      throw new AppError('There is already one product with this name');
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await this.productsRepository.save(product);

    return product;
  }
}
export { UpdateProductsService };
