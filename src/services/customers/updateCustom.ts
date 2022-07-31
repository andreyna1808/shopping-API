import { inject, injectable } from 'tsyringe';

import { ICustomersRepository } from '../../interface/ICustomer';
import { AppError } from '../../utils/appError';

interface IUsers {
  id: string;
  name: string;
  email: string;
}

@injectable()
class UpdateCustomService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  async update({ id, name, email }: IUsers) {
    const customExists = await this.customersRepository.findByEmail(email);
    const updateCustom = await this.customersRepository.findById(id);

    if (!updateCustom) {
      throw new AppError('User not found', 404);
    }

    if (customExists && email !== updateCustom.email) {
      // Precisa dessa segunda verificação para não impedir o update
      // Se ele já existir e for diferente do que eu quero modificar
      throw new AppError('There is already one product with this email', 409);
    }

    updateCustom.name = name;
    updateCustom.email = email;

    await this.customersRepository.save(updateCustom);

    return updateCustom;
  }
}

export { UpdateCustomService };
