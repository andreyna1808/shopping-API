import 'reflect-metadata';
import FakeCustomersRepository from '../../../repositories/fake/customerRepository';
import { AppError } from '../../../utils/appError';
import { ListCustomerService } from '../listCustom';

let fakeCustomersRepository: FakeCustomersRepository;
let listCustomer: ListCustomerService;
let page: number;
let limit: number;

describe('List Customer', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();

    listCustomer = new ListCustomerService(fakeCustomersRepository);

    page = 1;
    limit = 15;
  });

  it('Should be able to list customers', async () => {
    await listCustomer.list({ page, limit });

    expect(listCustomer);
  });

  it('Should be able to list by Id', async () => {
    const data = await listCustomer.listById(
      '983a0c77-cbfa-453a-aae6-92baff12f89c',
    );

    expect(data);
  });

  it('Custom not found', () => {
    const listCustom = listCustomer.listById(
      '083a0c77-cbfa-453a-aae6-92baff12f89c',
    );

    expect(listCustom).rejects.toBeInstanceOf(AppError);
  });
});
