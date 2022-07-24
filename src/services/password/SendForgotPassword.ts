import path from 'path';
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

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      '..',
      'views',
      'forgot.hbs',
    );

    await EtherealMail.sendMail({
      to: { name: user.name, email: user.email },
      subject: '[API VENDAS] Recuperação de Senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          token: forgotPassword?.token,
          link: `http://localhost:3000/reset_password?token=${forgotPassword.token}`,
        },
      },
    });

    return forgotPassword;
  }
}

export { SendForgotPasswordService };

/*
Será responsável por definir que o user_id receberá o mesmo id de id da tabela de usuários
*/
