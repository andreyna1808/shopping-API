/* eslint-disable import/no-extraneous-dependencies */
import { getRepository, Repository } from 'typeorm';

import UsersEntitie from '../entities/usersEntitie';
import { ICreateUser, IUsersRepository } from '../interface/IUsers';

type SearchParams = {
  page: number;
  skip: number;
  take: number;
};

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<UsersEntitie>;

  constructor() {
    this.ormRepository = getRepository(UsersEntitie);
  }

  public async create({ name, email, password }: ICreateUser) {
    const user = this.ormRepository.create({ name, email, password });

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user) {
    await this.ormRepository.save(user);

    return user;
  }

  public async remove(user) {
    await this.ormRepository.remove(user);
  }

  public async findAll({ page, skip, take }: SearchParams) {
    const [users, count] = await this.ormRepository
      .createQueryBuilder()
      .skip(skip)
      .take(take)
      .getManyAndCount();

    const result = {
      per_page: take,
      total: count,
      current_page: page,
      data: users,
    };

    return result;
  }

  public async findByName(name: string) {
    const user = await this.ormRepository.findOne({
      name,
    });

    return user;
  }

  public async findById(id: string) {
    const user = await this.ormRepository.findOne({
      id,
    });

    return user;
  }

  public async findByEmail(email: string) {
    const user = await this.ormRepository.findOne({
      email,
    });

    return user;
  }
}

export default UsersRepository;
