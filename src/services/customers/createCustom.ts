import { getCustomRepository, Repository } from 'typeorm';

import CustomersEntitie from '../../entities/customersEntitie';
import CustomRepository from '../../repositories/customersRepository';
import { AppError } from '../../utils/appError';

interface ICustom {
  name: string;
  email: string;
}

class CreateCustomService {
  private customRepository: Repository<CustomersEntitie>;

  constructor() {
    this.customRepository = getCustomRepository(CustomRepository);
  }

  async create({ name, email }: ICustom) {
    const customExists = await this.customRepository.findOne({ email });

    if (customExists) {
      throw new AppError('There is already one product with this email', 409);
    }

    const createCustom = this.customRepository.create({
      name,
      email,
    });

    await this.customRepository.save(createCustom);

    return createCustom;
  }
}

export { CreateCustomService };
