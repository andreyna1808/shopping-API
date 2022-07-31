import 'reflect-metadata';
import FakeUsersRepository from '../../../repositories/fake/userRepository';
import { AppError } from '../../../utils/appError';
import { UpdateUsesService } from '../updateUsers';

let fakeUsersRepository: FakeUsersRepository;
let updateUser: UpdateUsesService;

describe('updateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    updateUser = new UpdateUsesService(fakeUsersRepository);
  });

  it('Should be able to update a user', async () => {
    const user = await updateUser.update({
      id: '297a07e0-c937-48a3-b8dd-1c68f994d803',
      name: 'Drica update',
      email: 'deucertooo@gmail.com',
      password: '12345678',
    });

    expect(user).toHaveProperty('id');
  });

  it('User not found', async () => {
    const otherCustom = updateUser.update({
      id: '9264b66d-22c5-4128-bb08-48628aaea31f',
      name: 'Andreyna Carvalho',
      email: 'teste@teste.com',
      password: '123456',
    });

    expect(otherCustom).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to update two user with the same email', async () => {
    const otherCustom = updateUser.update({
      id: '197a07e0-c937-48a3-b8dd-1c68f994d803',
      name: 'Andreyna Carvalho',
      email: 'drica@gmail.com',
      password: '123456',
    });

    expect(otherCustom).rejects.toBeInstanceOf(AppError);
  });
});
