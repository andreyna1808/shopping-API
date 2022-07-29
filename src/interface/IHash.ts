export interface IHashProvider {
  generateHash(payload: string);
  compareHash(payload: string, hashed: string);
}
