import { container } from 'tsyringe';

import BcryptHashProvider from '../config/bcryptHash';
import { ICustomersRepository } from '../interface/ICustomer';
import { IHashProvider } from '../interface/IHash';
import { IOrdersRepository } from '../interface/IOrder';
import { IProductsRepository } from '../interface/IProducts/IProducts';
import { IUsersRepository } from '../interface/IUsers';
import { IUserTokensRepository } from '../interface/IUserToken';
import CustomRepository from '../repositories/customersRepository';
import OrdersRepository from '../repositories/ordersRepository';
import ProductsRepository from '../repositories/productsRepository';
import TokenRepository from '../repositories/tokenRepository';
import UsersRepository from '../repositories/usersRepository';

container.registerSingleton<ICustomersRepository>(
  'CustomersRepository',
  CustomRepository,
);
container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductsRepository,
);

container.registerSingleton<IOrdersRepository>(
  'OrdersRepository',
  OrdersRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  TokenRepository,
);

container.registerSingleton<IHashProvider>('HashProvider', BcryptHashProvider);
