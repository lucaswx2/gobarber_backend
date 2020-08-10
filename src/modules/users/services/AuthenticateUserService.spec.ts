import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashRepository: FakeHashProvider;
let createSessionService: AuthenticateUserService;
let createUserService: CreateUserService;
let fakeCacheProvider: FakeCacheProvider;
describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashRepository = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();
    createSessionService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashRepository,
    );
    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to authenticate', async () => {
    const user = await createUserService.execute({
      name: 'John Doe',
      email: 'johndoe@emaxiple.com',
      password: '123456',
    });

    const response = await createSessionService.execute({
      email: 'johndoe@emaxiple.com',
      password: '123456',
    });
    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able with non existing user', async () => {
    expect(
      createSessionService.execute({
        email: 'johndoe@emaxiple.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await createUserService.execute({
      name: 'John Doe',
      email: 'johndoe@emaxiple.com',
      password: '123456',
    });

    await expect(
      createSessionService.execute({
        email: 'johndoe@emaxiple.com',
        password: 'wrongPass',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
