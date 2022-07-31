import { compare, hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '../../interface/IUsers';
import { AppError } from '../../utils/appError';

interface IUser {
  user_id: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string; // Envia a senha anterior para poder atualizad
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async updateProfile({ user_id, name, email, password, old_password }: IUser) {
    const user = await this.usersRepository.findById(user_id);
    const userUpdate = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    if (userUpdate && userUpdate.id !== user_id) {
      // Verifica se o email já existe é diferente do nosso id
      throw new AppError('There is already one user with this email', 409);
    }

    if (password && !old_password) {
      throw new AppError('Old password is required');
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError('Old password does not correct');
      }

      user.password = await hash(password, 8);
    }

    user.name = name;
    user.email = email;

    const updateProfile = await this.usersRepository.save(user);

    return updateProfile;
  }
}

export { UpdateProfileService };
