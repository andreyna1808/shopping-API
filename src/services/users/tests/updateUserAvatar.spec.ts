import 'reflect-metadata';
import FakeUsersRepository from '../../../repositories/fake/userRepository';
import { AppError } from '../../../utils/appError';
import { UpdateUserAvatarService } from '../updateUserAvatar';

let fakeUsersRepository: FakeUsersRepository;
let updateUser: UpdateUserAvatarService;

describe('updateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    updateUser = new UpdateUserAvatarService(fakeUsersRepository);
  });

  it('Should be able to update a user', async () => {
    const avatar = await updateUser.updateAvatar({
      id: '297a07e0-c937-48a3-b8dd-1c68f994d803',
      avatar: 'dados.jpeg',
    });

    expect(avatar).toHaveProperty('avatar');
  });

  it('User not found', async () => {
    const otherCustom = updateUser.updateAvatar({
      id: '9264b66d-22c5-4128-bb08-48628aaea31f',
      avatar: 'dados.jpeg',
    });

    expect(otherCustom).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to update two user with the same email', async () => {
    const otherCustom = updateUser.updateAvatar({
      id: '197a07e0-c937-48a3-b8dd-1c68f994d803',
      avatar: 'dados.jpeg',
    });

    expect(otherCustom).rejects.toBeInstanceOf(AppError);
  });
});
