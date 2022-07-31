import 'reflect-metadata';
import FakeCustomersRepository from '../../../repositories/fake/customerRepository';
import { AppError } from '../../../utils/appError';
import { CreateCustomService } from '../createCustom';

let fakeCustomersRepository: FakeCustomersRepository;
let createCustomer: CreateCustomService;

describe('CreateCustomer', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();

    createCustomer = new CreateCustomService(fakeCustomersRepository);
  });

  it('Should be able to create a new customer', async () => {
    const customer = await createCustomer.create({
      name: 'Andreyna Carvalho',
      email: 'teste@teste.com',
    });

    expect(customer).toHaveProperty('id');
  });

  it('Should not be able to create two customers with the same email', async () => {
    const fakeCustomersRepository = new FakeCustomersRepository();
    const createCustomer = new CreateCustomService(fakeCustomersRepository);

    await createCustomer.create({
      name: 'Andreyna Carvalho',
      email: 'teste@teste.com',
    });

    expect(
      createCustomer.create({
        name: 'Andreyna Carvalho',
        email: 'teste@teste.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
