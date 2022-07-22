import { getCustomRepository, Repository } from 'typeorm';

import ProductsEntitie from '../../entities/productsEntitie';
import ProductsRepository from '../../repositories/productsRepository';
import { AppError } from '../../utils/appError';

interface IProducts {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

class UpdateProductsService {
  private productsRepository: Repository<ProductsEntitie>;

  constructor() {
    this.productsRepository = getCustomRepository(ProductsRepository);
  }

  async update({ id, name, price, quantity }: IProducts) {
    const productsExists = await this.productsRepository.findOne({ name });
    const updateProducts = await this.productsRepository.findOne({ id });

    if (!updateProducts) {
      throw new AppError('Product not found', 404);
    }

    if (productsExists && name !== updateProducts.name) {
      // Precisa dessa segunda verificação para não impedir o update
      // Se ele já existir e for diferente do que eu quero modificar
      throw new AppError('There is already one product with this name', 409);
    }

    updateProducts.name = name;
    updateProducts.price = price;
    updateProducts.quantity = quantity;

    await this.productsRepository.save(updateProducts);

    return updateProducts;
  }
}

export { UpdateProductsService };
