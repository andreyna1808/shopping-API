/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { v4 as uuidv4 } from 'uuid';

import UsersEntitie from '../../entities/usersEntitie';
import { ICreateUser, IUsersRepository } from '../../interface/IUsers';

class FakeUsersRepository implements IUsersRepository {
  private users: UsersEntitie[] = [
    {
      id: '297a07e0-c937-48a3-b8dd-1c68f994d803',
      name: 'Drica',
      email: 'drica@gmail.com',
      password: '12345678',
      avatar: null,
      created_at: new Date(),
      updated_at: new Date(),
      getAvatarUrl: null,
    },
    {
      id: '197a07e0-c937-48a3-b8dd-1c68f994d803',
      name: 'Drica',
      email: 'teste2010@gmail.com',
      password: '12345678',
      avatar: null,
      created_at: new Date(),
      updated_at: new Date(),
      getAvatarUrl: null,
    },
    {
      id: '997a07e0-c937-48a3-b8dd-1c68f994d809',
      name: 'Drica',
      email: 'updatepassword@gmail.com',
      password: 'admin09',
      avatar: null,
      created_at: new Date(),
      updated_at: new Date(),
      getAvatarUrl: null,
    },
    {
      id: '117a07e0-c937-48a3-b8dd-1c68f994d801',
      name: 'Drica',
      email: 'updatepassword@gmail.com',
      password: 'admin09',
      avatar: 'teste.jpeg',
      created_at: new Date(),
      updated_at: new Date(),
      getAvatarUrl: null,
    },
  ];

  public async create({ name, email, password }: ICreateUser) {
    const user = new UsersEntitie();

    user.id = uuidv4();
    user.name = name;
    user.email = email;
    user.password = password;

    this.users.push(user);

    return user;
  }

  public async save(user: UsersEntitie) {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

    this.users[findIndex] = user;

    return user;
  }

  public async remove(user: UsersEntitie) {}

  public async findAll() {
    return undefined;
  }

  public async findByName(name: string) {
    const user = this.users.find(user => user.name === name);
    return user;
  }

  public async findById(id: string) {
    const user = this.users.find(user => user.id === id);
    return user;
  }

  public async findByEmail(email: string) {
    const user = this.users.find(user => user.email === email);
    return user;
  }
}

export default FakeUsersRepository;
