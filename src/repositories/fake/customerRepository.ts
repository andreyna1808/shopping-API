/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { v4 as uuidv4 } from 'uuid';

import CustomersEntitie from '../../entities/customersEntitie';
import {
  ICreateCustomer,
  ICustomersRepository,
} from '../../interface/ICustomer';

class FakeCustomersRepository implements ICustomersRepository {
  private customers: CustomersEntitie[] = [
    {
      id: '983a0c77-cbfa-453a-aae6-92baff12f89c',
      name: 'Hello',
      email: 'hewwlo@gmail.com',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: '783a0c77-cbfa-453a-aae6-92baff12f89c',
      name: 'Hello',
      email: 'hewwlo2@gmail.com',
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];

  public async create({ name, email }: ICreateCustomer) {
    const customer = new CustomersEntitie();

    customer.id = uuidv4();
    customer.name = name;
    customer.email = email;

    this.customers.push(customer);

    return customer;
  }

  public async save(customer: CustomersEntitie) {
    Object.assign(this.customers, customer);

    return customer;
  }

  public async remove(dataRemoveCustomer: CustomersEntitie) {}

  public async findAll() {
    return undefined;
  }

  public async findByName(name: string) {
    const customer = this.customers.find(customer => customer.name === name);
    return customer;
  }

  public async findById(id: string) {
    const customer = this.customers.find(customer => customer.id === id);
    return customer;
  }

  public async findByEmail(email: string) {
    const customer = this.customers.find(customer => customer.email === email);
    return customer;
  }
}

export default FakeCustomersRepository;
