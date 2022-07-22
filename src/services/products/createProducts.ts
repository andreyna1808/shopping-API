import { getCustomRepository, Repository } from 'typeorm';

import ProductsEntitie from '../../entities/productsEntitie';
import ProductsRepository from '../../repositories/productsRepository';
import { AppError } from '../../utils/appError';

interface IProducts {
  name: string;
  price: number;
  quantity: number;
}

class CreateProductsService {
  private productsRepository: Repository<ProductsEntitie>;

  constructor() {
    this.productsRepository = getCustomRepository(ProductsRepository);
  }

  async create({ name, price, quantity }: IProducts) {
    const productsExists = await this.productsRepository.findOne({ name });
    if (productsExists) {
      throw new AppError('There is already one product with this name', 409);
    }

    const createProduct = this.productsRepository.create({
      name,
      price,
      quantity,
    });

    await this.productsRepository.save(createProduct);

    return createProduct;
  }
}

export { CreateProductsService };
