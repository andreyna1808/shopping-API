import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '../../interface/IUsers';
import { AppError } from '../../utils/appError';

interface IUsers {
  id: string;
  name: string;
  email: string;
  password: string;
}

@injectable()
class UpdateUsesService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}
  async update({ id, name, email, password }: IUsers) {
    const usersExists = await this.usersRepository.findByEmail(email);
    const updateUser = await this.usersRepository.findById(id);

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
