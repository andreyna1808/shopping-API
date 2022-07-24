import { getCustomRepository, Repository } from 'typeorm';

import EtherealMail from '../../config/mail';
import TokenEntitie from '../../entities/tokenEntitie';
import UsersEntitie from '../../entities/usersEntitie';
import TokenRepository from '../../repositories/tokenRepository';
import UsersRepository from '../../repositories/usersRepository';
import { AppError } from '../../utils/appError';

class SendForgotPasswordService {
  private tokenRepository: Repository<TokenEntitie>;
  private usersRepository: Repository<UsersEntitie>;

  constructor() {
    this.tokenRepository = getCustomRepository(TokenRepository);
    this.usersRepository = getCustomRepository(UsersRepository);
  }

  async forgotPassword(email: string) {
    const user = await this.usersRepository.findOne({ email });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const forgotPassword = this.tokenRepository.create({
      user_id: user.id,
    });

    await this.tokenRepository.save(forgotPassword);

    await EtherealMail.sendMail({
      to: email,
      body: `<p>Solicitação de redefinição de senha recebida: ${forgotPassword.token}</p>`,
    });

    return forgotPassword;
  }
}

export { SendForgotPasswordService };

/*
Será responsável por definir que o user_id receberá o mesmo id de id da tabela de usuários
*/
