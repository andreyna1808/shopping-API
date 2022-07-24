import { getCustomRepository, Repository } from 'typeorm';

import CustomersEntitie from '../../entities/customersEntitie';
import CustomRepository from '../../repositories/customersRepository';
import { AppError } from '../../utils/appError';

interface IPagination {
  from: number;
  to: number;
  per_page: number;
  total: number;
  current_page: number;
  prev_page: number | null;
  next_page: number | null;
  data: CustomersEntitie[];
}

class ListCustomerService {
  private customRepository: Repository<CustomersEntitie>;

  constructor() {
    this.customRepository = getCustomRepository(CustomRepository);
  }

  async list() {
    const listCustom = await this.customRepository
      .createQueryBuilder()
      .paginate();
    return listCustom as IPagination;
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
