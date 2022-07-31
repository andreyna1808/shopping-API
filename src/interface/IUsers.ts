export interface ICreateSession {
  email: string;
  password: string;
}

export interface ICreateUser {
  name: string;
  email: string;
  password: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
  created_at: Date;
  updated_at: Date;
  getAvatarUrl(): string | null;
}

export interface IPaginateUser {
  per_page: number;
  total: number;
  current_page: number;
  data: IUser[];
}

export interface IResetPassword {
  token: string;
  password: string;
}

export interface IUpdateProfile {
  user_id: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
}

export interface IUpdateUserAvatar {
  user_id: string;
  avatarFilename: string;
}

export interface IUserAuthenticated {
  user: IUser;
  token: string;
}

export interface IUserToken {
  id: string;
  token: string;
  user_id: string;
  created_at: Date;
  updated_at: Date;
}

type SearchParams = {
  page: number;
  skip: number;
  take: number;
};

export interface IUsersRepository {
  findAll({ page, skip, take }: SearchParams): Promise<IPaginateUser>;
  findByName(name: string): Promise<IUser | null>;
  findById(id: string): Promise<IUser | null>;
  findByEmail(email: string): Promise<IUser | null>;
  create(data: ICreateUser);
  save(user: IUser): Promise<IUser>;
  remove(user: IUser);
}
