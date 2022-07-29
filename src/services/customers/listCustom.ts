import { inject, injectable } from 'tsyringe';

import { ICustomersRepository } from '../../interface/ICustomer';
import { AppError } from '../../utils/appError';

interface ISearchParams {
  page: number;
  limit: number;
}

@injectable()
class ListCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  async list({ page, limit }: ISearchParams) {
    const take = limit;
    const skip = (Number(page) - 1) * take;

    const listCustom = await this.customersRepository.findAll({
      page,
      skip,
      take,
    });

    return listCustom;
  }

  async listById(id: string) {
    const listCustom = await this.customersRepository.findById(id);

    if (!listCustom) {
      throw new AppError('User not found', 404);
    }

    return listCustom;
  }
}

export { ListCustomerService };
