import { inject, injectable } from 'tsyringe';

import { ICustomersRepository } from '../../interface/ICustomer';
import { AppError } from '../../utils/appError';

@injectable()
class DeleteCustomService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  async delete(id: string) {
    const removeCustom = await this.customersRepository.findById(id);

    if (!removeCustom) {
      throw new AppError('User not found', 404);
    }

    await this.customersRepository.remove(removeCustom);
  }
}

export { DeleteCustomService };
