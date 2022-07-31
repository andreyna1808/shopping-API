import { inject, injectable } from 'tsyringe';

import {
  ICreateCustomer,
  ICustomersRepository,
} from '../../interface/ICustomer';
import { AppError } from '../../utils/appError';

@injectable()
class CreateCustomService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async create({ name, email }: ICreateCustomer) {
    const emailExists = await this.customersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email address already used.');
    }

    const customer = await this.customersRepository.create({
      name,
      email,
    });

    return customer;
  }
}

export { CreateCustomService };
