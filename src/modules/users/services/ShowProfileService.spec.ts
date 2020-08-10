import AppError from '@shared/errors/AppError';

import ShowProfileService from './ShowProfileService';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

let fakeUsersRepository: FakeUsersRepository;

let showProfile: ShowProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfile = new ShowProfileService(fakeUsersRepository);
  });
  it('should return user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@emaxiple.com',
      password: '123456',
    });

    const showUser = await showProfile.execute(user.id);

    await expect(showUser.id).toBe(user.id);
  });

  it('should throw error if users does not exists', async () => {
    await expect(showProfile.execute('non-existing-id')).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
