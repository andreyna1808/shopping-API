/* eslint-disable import/no-extraneous-dependencies */
import { getRepository, Repository } from 'typeorm';

import TokenEntitie from '../entities/tokenEntitie';
import { IUserTokensRepository } from '../interface/IUserToken';

class TokenRepository implements IUserTokensRepository {
  private ormRepository: Repository<TokenEntitie>;

  constructor() {
    this.ormRepository = getRepository(TokenEntitie);
  }

  public async findByToken(token: string) {
    const userToken = await this.ormRepository.findOne({
      token,
    });

    return userToken;
  }

  public async generate(user_id: string) {
    const userToken = this.ormRepository.create({
      user_id,
    });

    await this.ormRepository.save(userToken);

    return userToken;
  }
}
export default TokenRepository;
