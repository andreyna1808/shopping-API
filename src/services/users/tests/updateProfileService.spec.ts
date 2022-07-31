import 'reflect-metadata';
import FakeUsersRepository from '../../../repositories/fake/userRepository';
import { AppError } from '../../../utils/appError';
import { UpdateProfileService } from '../updateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let updateUser: UpdateProfileService;

describe('updateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    updateUser = new UpdateProfileService(fakeUsersRepository);
  });

  it('Should be able to update a user', async () => {
    const user = await updateUser.updateProfile({
      user_id: '997a07e0-c937-48a3-b8dd-1c68f994d809',
      name: 'Drica',
      email: 'updatepassword@gmail.com',
      password: '12345678',
      old_password: 'admin09',
    });

    expect(user);
  });

  it('Old password does not correct', async () => {
    const user = updateUser.updateProfile({
      user_id: '997a07e0-c937-48a3-b8dd-1c68f994d809',
      name: 'Drica',
      email: 'updatepassword@gmail.com',
      password: '12345678',
      old_password: 'admin098',
    });

    expect(user).rejects.toBeInstanceOf(AppError);
  });

  it('User not found', async () => {
    const otherCustom = updateUser.updateProfile({
      user_id: '9264b66d-22c5-4128-bb08-48628aaea31f',
      name: 'Andreyna Carvalho',
      email: 'teste@teste.com',
      password: '123456',
      old_password: '123456',
    });

    expect(otherCustom).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to update two user with the same email', async () => {
    const otherCustom = updateUser.updateProfile({
      user_id: '197a07e0-c937-48a3-b8dd-1c68f994d803',
      name: 'Andreyna Carvalho',
      email: 'drica@gmail.com',
      password: '123456',
      old_password: '123456',
    });

    expect(otherCustom).rejects.toBeInstanceOf(AppError);
  });

  it('Necessary old password', async () => {
    const otherCustom = updateUser.updateProfile({
      user_id: '297a07e0-c937-48a3-b8dd-1c68f994d803',
      name: 'Andreyna Carvalho',
      email: 'drica@gmail.com',
      password: '123456',
    });

    expect(otherCustom).rejects.toBeInstanceOf(AppError);
  });
});
