import { getCustomRepository, Repository } from 'typeorm';

import ProductsEntitie from '../../entities/productsEntitie';
import ProductsRepository from '../../repositories/productsRepository';
import { AppError } from '../../utils/appError';

class DeleteProductsService {
  private productsRepository: Repository<ProductsEntitie>;

  constructor() {
    this.productsRepository = getCustomRepository(ProductsRepository);
  }

  async delete(id: string) {
    const removeProduct = await this.productsRepository.findOne({ id });

    if (!removeProduct) {
      throw new AppError('Product not found', 404);
    }

    await this.productsRepository.remove(removeProduct);
  }
}

export { DeleteProductsService };
