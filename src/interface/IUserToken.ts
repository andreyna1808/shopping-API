export interface IUserToken {
  id: string;
  token: string;
  user_id: string;
  created_at: Date;
  updated_at: Date;
}

export interface IUserTokensRepository {
  findByToken(token: string);
  generate(user_id: string);
}
