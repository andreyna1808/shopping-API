import fs from 'fs';
import path from 'path';
import { getCustomRepository, Repository } from 'typeorm';

import { Upload } from '../../config/upload';
import UsersEntitie from '../../entities/usersEntitie';
import UsersRepository from '../../repositories/usersRepository';
import { AppError } from '../../utils/appError';

interface IUsers {
  id: string;
  avatar: string;
}

class UpdateUserAvatarService {
  private usersRepository: Repository<UsersEntitie>;

  constructor() {
    this.usersRepository = getCustomRepository(UsersRepository);
  }

  async updateAvatar({ id, avatar }: IUsers) {
    const user = await this.usersRepository.findOne({ id });

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
