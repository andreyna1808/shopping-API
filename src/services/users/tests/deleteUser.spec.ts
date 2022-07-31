import 'reflect-metadata';
import FakeUsersRepository from '../../../repositories/fake/userRepository';
import { AppError } from '../../../utils/appError';
import { DeleteUsersService } from '../deleteUsers';

let fakeUsersRepository: FakeUsersRepository;
let deleteCustomer: DeleteUsersService;

describe('updateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    deleteCustomer = new DeleteUsersService(fakeUsersRepository);
  });

  it('Should be able to remove a new user', async () => {
    await deleteCustomer.delete('197a07e0-c937-48a3-b8dd-1c68f994d803');

    expect(undefined);
  });

  it('Should not be able to remove twice', async () => {
    await deleteCustomer.delete('197a07e0-c937-48a3-b8dd-1c68f994d803');

    expect(
      deleteCustomer.delete('197a07e0-c937-48a3-b8dd-1c68f994d803'),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('User not found', () => {
    const removeCustom = deleteCustomer.delete(
      '083a0c77-cbfa-453a-aae6-92baff12f89c',
    );

    expect(removeCustom).rejects.toBeInstanceOf(AppError);
  });
});
