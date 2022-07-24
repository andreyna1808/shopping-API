import { getCustomRepository, Repository } from 'typeorm';

import CustomersEntitie from '../../entities/customersEntitie';
import CustomRepository from '../../repositories/customersRepository';
import { AppError } from '../../utils/appError';

interface IUsers {
  id: string;
  name: string;
  email: string;
}

class UpdateCustomService {
  private customRepository: Repository<CustomersEntitie>;

  constructor() {
    this.customRepository = getCustomRepository(CustomRepository);
  }

  async update({ id, name, email }: IUsers) {
    const customExists = await this.customRepository.findOne({ email });
    const updateCustom = await this.customRepository.findOne({ id });

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

    await this.customRepository.save(updateCustom);

    return updateCustom;
  }
}

export { UpdateCustomService };
