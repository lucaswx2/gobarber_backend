import { getRepository, Repository, Not } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllProvidersDTO from '@modules/appointments/dtos/IFindAllProvidersDTO';
import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findAllProviders(data: IFindAllProvidersDTO): Promise<User[]> {
    let users: User[];
    if (data.except_user_id) {
      users = await this.ormRepository.find({
        where: {
          id: Not(data.except_user_id),
        },
      });
    } else {
      users = await this.ormRepository.find();
    }
    return users;
  }

  public async save(userData: User): Promise<User> {
    const user = await this.ormRepository.save(userData);
    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);
    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { email } });

    return user;
  }

  public async create(data: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(data);

    await this.ormRepository.save(user);
    return user;
  }
}

export default UsersRepository;
