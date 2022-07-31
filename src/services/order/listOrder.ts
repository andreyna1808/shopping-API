import { inject, injectable } from 'tsyringe';

import { IOrdersRepository } from '../../interface/IOrder';
import { AppError } from '../../utils/appError';

interface ISearchParams {
  page: number;
  limit: number;
}
@injectable()
class ListOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  public async list({ page, limit }: ISearchParams) {
    const take = limit;
    const skip = (Number(page) - 1) * take;
    const orders = await this.ordersRepository.findAll({
      page,
      skip,
      take,
    });

    return orders;
  }

  public async listById(id: string) {
    const order = await this.ordersRepository.findById(id);

    if (!order) {
      throw new AppError('Order not found.');
    }

    return order;
  }
}

export default ListOrderService;
