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
      throw new AppError('Incorrect email/password', 401); // 401 não autorizado
    }

    // primeiro parametro é o payload, informações que iremos devolver para o usuário,
    // segundo parametro é o hash que informamos o ciclo usado para criar o token
    // terceito parametro é um objeto com as demais configurações exigidas no token
    const token = sign({}, authConfig.jwt, {
      subject: user.id, // Referência do id
      expiresIn: authConfig.dateExpires, // Irá expirar conforme o prazo que coloquei no arquivo terá que gerar um novo token
    });

    return { user, token };
  }
}

export { CreateSessionService };

/*
Essa arquivo tem como objetivo enviar um token quando o usuário logar no site
*/
