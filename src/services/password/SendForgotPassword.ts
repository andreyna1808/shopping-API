import path from 'path';
import { inject, injectable } from 'tsyringe';

import EtherealMail from '../../config/mail';
import { IUsersRepository } from '../../interface/IUsers';
import { IUserTokensRepository } from '../../interface/IUserToken';
import { AppError } from '../../utils/appError';

@injectable()
class SendForgotPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}
  async forgotPassword(email: string) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const forgotPassword = await this.userTokensRepository.generate(user.id);

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
          link: `${process.env.APP_WEB_URL}/reset_password?token=${forgotPassword.token}`,
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
