import 'reflect-metadata';
import FakeUsersRepository from '../../../repositories/fake/userRepository';
import { AppError } from '../../../utils/appError';
import { ShowProfileService } from '../showProfileService';

let fakeCustomersRepository: FakeUsersRepository;
let showProfileService: ShowProfileService;

describe('List Customer', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeUsersRepository();

    showProfileService = new ShowProfileService(fakeCustomersRepository);
  });

  it('Should be able to list by Id', async () => {
    const data = await showProfileService.showProfile(
      '297a07e0-c937-48a3-b8dd-1c68f994d803',
    );

    expect(data);
  });

  it('Users not found', () => {
    const listCustom = showProfileService.showProfile(
      '083a0c77-cbfa-453a-aae6-92baff12f89c',
    );

    expect(listCustom).rejects.toBeInstanceOf(AppError);
  });
});
