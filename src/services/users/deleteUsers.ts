import { getCustomRepository, Repository } from 'typeorm';

import UsersEntitie from '../../entities/usersEntitie';
import UsersRepository from '../../repositories/usersRepository';
import { AppError } from '../../utils/appError';

class DeleteUsersService {
  private usersRepository: Repository<UsersEntitie>;

  constructor() {
    this.usersRepository = getCustomRepository(UsersRepository);
  }

  async delete(id: string) {
    const removeUser = await this.usersRepository.findOne({ id });

    if (!removeUser) {
      throw new AppError('User not found', 404);
    }

    await this.usersRepository.remove(removeUser);
  }
}

export { DeleteUsersService };
