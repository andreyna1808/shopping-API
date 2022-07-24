import { hash } from 'bcryptjs';
import { addHours, isAfter } from 'date-fns';
import { getCustomRepository, Repository } from 'typeorm';

import TokenEntitie from '../../entities/tokenEntitie';
import UsersEntitie from '../../entities/usersEntitie';
import TokenRepository from '../../repositories/tokenRepository';
import UsersRepository from '../../repositories/usersRepository';
import { AppError } from '../../utils/appError';

interface IReset {
  token: string;
  password: string;
}

class ResetPasswordService {
  private tokenRepository: Repository<TokenEntitie>;
  private usersRepository: Repository<UsersEntitie>;

  constructor() {
    this.tokenRepository = getCustomRepository(TokenRepository);
    this.usersRepository = getCustomRepository(UsersRepository);
  }

  async resetPassword({ token, password }: IReset) {
    const userToken = await this.tokenRepository.findOne({ token });

    if (!userToken) {
      throw new AppError('User not found', 404);
    }

    const userId = userToken.user_id;
    const user = await this.usersRepository.findOne(userId); // Ver essa parte aqui

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired', 498);
    }

    user.password = await hash(password, 8);
    const saveResetPassword = await this.usersRepository.save(user);

    return saveResetPassword;
  }
}

export { ResetPasswordService };

/*
Será responsável por definir que o user_id receberá o mesmo id de id da tabela de usuários
*/
