import IHashProvider from '../models/IHashProvider';

export default class BCryptHashProvider implements IHashProvider {
  compareHash(payload: string, hashed: string): Promise<boolean> | boolean {
    return payload === hashed;
  }

  public async generateHash(payload: string): Promise<string> {
    return payload;
  }
}
