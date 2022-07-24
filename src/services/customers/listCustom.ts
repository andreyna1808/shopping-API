import { getCustomRepository, Repository } from 'typeorm';

import CustomersEntitie from '../../entities/customersEntitie';
import CustomRepository from '../../repositories/customersRepository';
import { AppError } from '../../utils/appError';

class ListCustomerService {
  private customRepository: Repository<CustomersEntitie>;

  constructor() {
    this.customRepository = getCustomRepository(CustomRepository);
  }

  async list() {
    const listCustom = await this.customRepository.find();
    return listCustom;
  }

  async listById(id: string) {
    const listCustom = await this.customRepository.findOne({ id });

    if (!listCustom) {
      throw new AppError('User not found', 404);
    }

    return listCustom;
  }
}

export { ListCustomerService };
