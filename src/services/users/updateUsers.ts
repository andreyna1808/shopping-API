import { getCustomRepository, Repository } from 'typeorm';

import UsersEntitie from '../../entities/usersEntitie';
import UsersRepository from '../../repositories/usersRepository';
import { AppError } from '../../utils/appError';

interface IUsers {
  id: string;
  name: string;
  email: string;
  password: string;
}

class UpdateUsesService {
  private usersRepository: Repository<UsersEntitie>;

  constructor() {
    this.usersRepository = getCustomRepository(UsersRepository);
  }

  async update({ id, name, email, password }: IUsers) {
    const usersExists = await this.usersRepository.findOne({ email });
    const updateUser = await this.usersRepository.findOne({ id });

    if (!updateUser) {
      throw new AppError('User not found', 404);
    }

    if (usersExists && email !== updateUser.email) {
      // Precisa dessa segunda verificação para não impedir o update
      // Se ele já existir e for diferente do que eu quero modificar
      throw new AppError('There is already one product with this email', 409);
    }

    updateUser.name = name;
    updateUser.email = email;
    updateUser.password = password;

    await this.usersRepository.save(updateUser);

    return updateUser;
  }
}

export { UpdateUsesService };
