import { getRepository, Repository } from 'typeorm';

import CustomersEntitie from '../entities/customersEntitie';
import {
  ICreateCustomer,
  ICustomersRepository,
  SearchParams,
} from '../interface/ICustomer';

class CustomRepository implements ICustomersRepository {
  private ormRepository: Repository<CustomersEntitie>;

  constructor() {
    this.ormRepository = getRepository(CustomersEntitie);
  }

  public async create({ name, email }: ICreateCustomer) {
    const customer = this.ormRepository.create({ name, email });

    await this.ormRepository.save(customer);

    return customer;
  }

  public async save(customer: CustomersEntitie) {
    await this.ormRepository.save(customer);

    return customer;
  }

  public async remove(customer: CustomersEntitie) {
    await this.ormRepository.remove(customer);
  }

  public async findAll({ page, skip, take }: SearchParams) {
    const [customers, count] = await this.ormRepository
      .createQueryBuilder()
      .skip(skip)
      .take(take)
      .getManyAndCount();

    const result = {
      per_page: take,
      total: count,
      current_page: page,
      data: customers,
    };

    return result;
  }

  public async findByName(name: string) {
    const customer = await this.ormRepository.findOne({
      name,
    });

    return customer;
  }

  public async findById(id: string) {
    const customer = await this.ormRepository.findOne({
      id,
    });

    return customer;
  }

  public async findByEmail(email: string) {
    const customer = await this.ormRepository.findOne({
      email,
    });

    return customer;
  }
}

export default CustomRepository;
