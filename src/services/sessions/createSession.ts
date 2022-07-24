// Iniciar a sessão que gere um token para o usuário ter acesso em algumas informações
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getCustomRepository, Repository } from 'typeorm';

import { authConfig } from '../../config/auth';
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
    const confirmedPassword = await compare(password, user.password); // Compara se a senha com criptografia é semelhante a senha do usuário, a própria lib faz isso

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
