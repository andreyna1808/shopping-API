import { getCustomRepository, Repository } from 'typeorm';

import UsersEntitie from '../../entities/usersEntitie';
import UsersRepository from '../../repositories/usersRepository';
import { AppError } from '../../utils/appError';

class ShowProfileService {
  private usersRepository: Repository<UsersEntitie>;

  constructor() {
    this.usersRepository = getCustomRepository(UsersRepository);
  }

  async showProfile(id: string) {
    const usersExists = await this.usersRepository.findOne({ id });

    if (!usersExists) {
      throw new AppError('User not found', 404);
    }

    return usersExists;
  }
}

export { ShowProfileService };
