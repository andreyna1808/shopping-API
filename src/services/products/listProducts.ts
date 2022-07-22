import { getCustomRepository, Repository } from 'typeorm';

import ProductsEntitie from '../../entities/productsEntitie';
import ProductsRepository from '../../repositories/productsRepository';
import { AppError } from '../../utils/appError';

class ListProductsService {
  private productsRepository: Repository<ProductsEntitie>;

  constructor() {
    this.productsRepository = getCustomRepository(ProductsRepository);
  }

  async list() {
    const listProducts = await this.productsRepository.find();
    return listProducts;
  }

  async listById(id: string) {
    const listProducts = await this.productsRepository.findOne({ id });

    if (!listProducts) {
      throw new AppError('Product not found', 404);
    }

    return listProducts;
  }
}

export { ListProductsService };
