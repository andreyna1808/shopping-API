import 'reflect-metadata';
import FakeCustomersRepository from '../../../repositories/fake/customerRepository';
import { AppError } from '../../../utils/appError';
import { UpdateCustomService } from '../updateCustom';

let fakeCustomersRepository: FakeCustomersRepository;
let updateCustomer: UpdateCustomService;

describe('updateCustomer', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();

    updateCustomer = new UpdateCustomService(fakeCustomersRepository);
  });

  it('Should be able to update a customer', async () => {
    const customer = await updateCustomer.update({
      id: '983a0c77-cbfa-453a-aae6-92baff12f89c',
      name: 'Andreyna Carvalho',
      email: 'teste@teste.com',
    });

    expect(customer).toHaveProperty('id');
  });

  it('Should not be able to update two customers with the same email', async () => {
    const otherCustom = updateCustomer.update({
      id: '983a0c77-cbfa-453a-aae6-92baff12f89c',
      name: 'Andreyna Carvalho',
      email: 'hewwlo2@gmail.com',
    });

    expect(otherCustom).rejects.toBeInstanceOf(AppError);
  });

  it('Custom not found', () => {
    const listCustom = updateCustomer.update({
      id: '083a0c77-cbfa-453a-aae6-92baff12f89c',
      name: 'Andreyna Carvalho',
      email: 'hewwlo2@gmail.com',
    });

    expect(listCustom).rejects.toBeInstanceOf(AppError);
  });
});
