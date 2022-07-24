import { getCustomRepository, Repository } from 'typeorm';

import CustomersEntitie from '../../entities/customersEntitie';
import CustomRepository from '../../repositories/customersRepository';
import { AppError } from '../../utils/appError';

class DeleteCustomService {
  private customRepository: Repository<CustomersEntitie>;

  constructor() {
    this.customRepository = getCustomRepository(CustomRepository);
  }

  async delete(id: string) {
    const removeCustom = await this.customRepository.findOne({ id });

    if (!removeCustom) {
      throw new AppError('User not found', 404);
    }

    await this.customRepository.remove(removeCustom);
  }
}

export { DeleteCustomService };
