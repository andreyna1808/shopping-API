import { inject, injectable } from 'tsyringe';

import { IProductsRepository } from '../../interface/IProducts/IProducts';
import { AppError } from '../../utils/appError';

interface ISearchParams {
  page: number;
  limit: number;
}

@injectable()
class ListProductsService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async list({ page, limit }: ISearchParams) {
    const take = limit;
    const skip = (Number(page) - 1) * take;
    const products = await this.productsRepository.findAll({
      page,
      skip,
      take,
    });

    return products;
  }

  public async listById(id: string) {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new AppError('Product not found.');
    }

    return product;
  }
}

export { ListProductsService };
