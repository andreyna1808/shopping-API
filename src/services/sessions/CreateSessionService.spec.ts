import 'reflect-metadata';
import FakeHashProvider from '../../config/fake/fakeHashProvider';
import FakeUsersRepository from '../../repositories/fake/userRepository';
import { AppError } from '../../utils/appError';
import { CreateSessionService } from './createSession';

let fakeUsersRepository: FakeUsersRepository;
let createSession: CreateSessionService;
let fakeHashProvider: FakeHashProvider;

describe('CreateSession', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createSession = new CreateSessionService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Andreyna Carvalho',
      email: 'teste@teste.com',
      password: '123456',
    });

    const response = await createSession.createSession({
      email: 'teste@teste.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with non existent user', async () => {
    expect(
      createSession.createSession({
        email: 'teste@teste.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await fakeUsersRepository.create({
      name: 'Andreyna Carvalho',
      email: 'teste@teste.com',
      password: '123456',
    });

    expect(
      createSession.createSession({
        email: 'teste@teste.com',
        password: '567890',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
