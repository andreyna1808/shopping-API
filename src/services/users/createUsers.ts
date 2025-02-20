import { inject, injectable } from 'tsyringe';

import { IHashProvider } from '../../interface/IHash';
import { IUsersRepository } from '../../interface/IUsers';
import { AppError } from '../../utils/appError';

interface IUsers {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}
  async create({ name, email, password }: IUsers) {
    const usersExists = await this.usersRepository.findByEmail(email);

    if (usersExists) {
      throw new AppError('There is already one product with this email', 409);
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const createUser = this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return createUser;
  }
}

export { CreateUsersService };
