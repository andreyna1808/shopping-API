import { compare } from 'bcryptjs';
import { getCustomRepository, Repository } from 'typeorm';

import UsersEntitie from '../../entities/usersEntitie';
import UsersRepository from '../../repositories/usersRepository';
import { AppError } from '../../utils/appError';

interface IProducts {
  email: string;
  password: string;
}

class CreateSessionService {
  private usersRepository: Repository<UsersEntitie>;

  constructor() {
    this.usersRepository = getCustomRepository(UsersRepository);
  }

  async createSession({ email, password }: IProducts) {
    const user = await this.usersRepository.findOne({ email });
    const confirmedPassword = await compare(password, user.password);

    if (!user || !confirmedPassword) {
      throw new AppError('Incorrect email/password', 401);
    }

    return user;
  }
}

export { CreateSessionService };
