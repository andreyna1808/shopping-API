import 'reflect-metadata';
import FakeCustomersRepository from '../../../repositories/fake/customerRepository';
import { AppError } from '../../../utils/appError';
import { DeleteCustomService } from '../deleteCustom';

let fakeCustomersRepository: FakeCustomersRepository;
let deleteCustomer: DeleteCustomService;

describe('Delete Customer', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();

    deleteCustomer = new DeleteCustomService(fakeCustomersRepository);
  });

  it('Should be able to remove a new customer', async () => {
    await deleteCustomer.delete('983a0c77-cbfa-453a-aae6-92baff12f89c');

    expect(undefined);
  });

  it('Should not be able to remove twice', async () => {
    await deleteCustomer.delete('983a0c77-cbfa-453a-aae6-92baff12f89c');

    expect(
      deleteCustomer.delete('983a0c77-cbfa-453a-aae6-92baff12f89c'),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('Custom not found', () => {
    const removeCustom = deleteCustomer.delete(
      '083a0c77-cbfa-453a-aae6-92baff12f89c',
    );

    expect(removeCustom).rejects.toBeInstanceOf(AppError);
  });
});
