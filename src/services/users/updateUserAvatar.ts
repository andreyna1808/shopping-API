import fs from 'fs';
import path from 'path';
import { inject, injectable } from 'tsyringe';

import { Upload } from '../../config/upload';
import { IUsersRepository } from '../../interface/IUsers';
import { AppError } from '../../utils/appError';

interface IUsers {
  id: string;
  avatar: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async updateAvatar({ id, avatar }: IUsers) {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(Upload.directory, user.avatar); // Vai passar a informação de onde encontrar o arquivo
      const userAvatarExists = await fs.promises.stat(userAvatarFilePath); // Verifica se o arquivo existe

      if (userAvatarExists) {
        await fs.promises.unlink(userAvatarFilePath); // Se existir vai remover
      }
    }

    user.avatar = avatar;

    await this.usersRepository.save(user);

    return user;
  }
}

export { UpdateUserAvatarService };
