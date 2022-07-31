import 'reflect-metadata';
import FakeHashProvider from '../../../config/fake/fakeHashProvider';
import FakeUsersRepository from '../../../repositories/fake/userRepository';
import { AppError } from '../../../utils/appError';
import { CreateUsersService } from '../createUsers';

let fakeUsersRepository: FakeUsersRepository;
let createUser: CreateUsersService;
let fakeHashProvider: FakeHashProvider;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUsersService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.create({
      name: 'Andreyna Carvalho',
      email: 'teste@teste.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create two users with the same email', async () => {
    await createUser.create({
      name: 'Andreyna Carvalho',
      email: 'teste@teste.com',
      password: '123456',
    });

    expect(
      createUser.create({
        name: 'Andreyna Carvalho',
        email: 'teste@teste.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
