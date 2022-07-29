import { inject, injectable } from 'tsyringe';

import { IProductsRepository } from '../../interface/IProducts/IProducts';
import { AppError } from '../../utils/appError';

@injectable()
class DeleteProductsService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async delete(id: string) {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new AppError('Product not found.');
    }

    await this.productsRepository.remove(product);
  }
}
export { DeleteProductsService };
