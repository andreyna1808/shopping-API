import 'reflect-metadata';
import FakeUsersRepository from '../../../repositories/fake/userRepository';
import { AppError } from '../../../utils/appError';
import { ListUsersService } from '../listUsers';

let fakeCustomersRepository: FakeUsersRepository;
let listCustomer: ListUsersService;
let page: number;
let limit: number;

describe('List Customer', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeUsersRepository();

    listCustomer = new ListUsersService(fakeCustomersRepository);

    page = 1;
    limit = 15;
  });

  it('Should be able to list users', async () => {
    await listCustomer.list({ page, limit });

    expect(listCustomer);
  });

  it('Should be able to list by Id', async () => {
    const data = await listCustomer.listById(
      '297a07e0-c937-48a3-b8dd-1c68f994d803',
    );

    expect(data);
  });

  it('Users not found', () => {
    const listCustom = listCustomer.listById(
      '083a0c77-cbfa-453a-aae6-92baff12f89c',
    );

    expect(listCustom).rejects.toBeInstanceOf(AppError);
  });
});
