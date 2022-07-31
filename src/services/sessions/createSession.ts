// Iniciar a sessão que gere um token para o usuário ter acesso em algumas informações
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { authConfig } from '../../config/auth';
import { IHashProvider } from '../../interface/IHash';
import { IUsersRepository } from '../../interface/IUsers';
import { AppError } from '../../utils/appError';

interface IProducts {
  email: string;
  password: string;
}

@injectable()
class CreateSessionService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async createSession({ email, password }: IProducts) {
    const user = await this.usersRepository.findByEmail(email);

    const confirmedPassword = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!user || !confirmedPassword) {
      throw new AppError('Incorrect email/password', 401);
    }

    const token = sign({}, authConfig.jwt, {
      subject: user.id,
      expiresIn: authConfig.dateExpires,
    });

    return { user, token };
  }
}

export { CreateSessionService };
