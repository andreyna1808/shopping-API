import { getCustomRepository, Repository } from 'typeorm';

import UsersEntitie from '../../entities/usersEntitie';
import UsersRepository from '../../repositories/usersRepository';
import { AppError } from '../../utils/appError';

class ListUsersService {
  private usersRepository: Repository<UsersEntitie>;

  constructor() {
    this.usersRepository = getCustomRepository(UsersRepository);
  }

  async list() {
    const listUsers = await this.usersRepository.find();
    return listUsers;
  }

  async listById(id: string) {
    const listUsers = await this.usersRepository.findOne({ id });

    if (!listUsers) {
      throw new AppError('User not found', 404);
    }

    return listUsers;
  }
}

export { ListUsersService };
