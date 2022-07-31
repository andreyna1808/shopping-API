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

    console.log('Aqqqq', emailExists);

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

/*
Não é possível injetar a dependência \"customersRepository\"
na posição #0 do construtor \"CreateCustomService\".
Motivo:\n Tentativa de resolver o token de dependência não registrado: \"CustomersRepository\

Possibilidade 01: Precisa de injeção de depemdência no token tbm
*/
