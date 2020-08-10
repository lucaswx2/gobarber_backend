import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let fakeCacheProvider: FakeCacheProvider;

let listProvider: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProvider = new ListProvidersService(
      fakeUsersRepository,
      fakeCacheProvider,
    );
  });
  it('should be able to list the providers ', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@emaxiple.com',
      password: '123456',
    });
    const user2 = await fakeUsersRepository.create({
      name: 'John Tre',
      email: 'johntre@emaxiple.com',
      password: '123456',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'John Qua',
      email: 'johnqua@emaxiple.com',
      password: '123456',
    });
    const providers = await listProvider.execute(loggedUser.id);

    await expect(providers).toEqual([user1, user2]);
  });
});
