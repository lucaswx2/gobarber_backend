import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import { uuid } from 'uuidv4';
import IFindAllProvidersDTO from '@modules/appointments/dtos/IFindAllProvidersDTO';
import User from '../../infra/typeorm/entities/User';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findAllProviders(data: IFindAllProvidersDTO): Promise<User[]> {
    let { users } = this;

    if (data.except_user_id) {
      users = this.users.filter(user => user.id !== data.except_user_id);
    }
    return users;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(u => u.email === email);
    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = this.users.find(u => u.id === id);
    return user;
  }

  public async create({
    email,
    name,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();
    Object.assign(user, { id: uuid() }, { name }, { email }, { password });
    this.users.push(user);
    return user;
  }

  public async save(userData: User): Promise<User> {
    const findIndex = this.users.findIndex(user => user.id === userData.id);
    this.users[findIndex] = userData;
    return userData;
  }
}
export default FakeUsersRepository;
