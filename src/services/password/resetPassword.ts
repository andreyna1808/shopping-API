import { hash } from 'bcryptjs';
import { addHours, isAfter } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '../../interface/IUsers';
import { IUserTokensRepository } from '../../interface/IUserToken';
import { AppError } from '../../utils/appError';

interface IReset {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}
  async resetPassword({ token, password }: IReset) {
    const userToken = await this.userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User not found', 404);
    }

    const userId = userToken.user_id;
    const user = await await this.usersRepository.findById(userId); // Ver essa parte aqui

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
