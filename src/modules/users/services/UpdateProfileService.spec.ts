import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from './UpdateProfileService';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

let fakeUsersRepository: FakeUsersRepository;

let fakeHashProvider: FakeHashProvider;

let updateProfileService: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfileService = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });
  it('should throw error if user does not exist', async () => {
    await expect(
      updateProfileService.execute({
        user_id: 'non-existing',
        name: 'another',
        email: 'anotheremail@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@emaxiple.com',
      password: '123456',
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'another',
      email: 'anotheremail@email.com',
    });

    expect(updatedUser.name).toBe('another');
  });

  it('should be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@emaxiple.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'teste@emaxiple.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'another',
        email: 'johndoe@emaxiple.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'teste@emaxiple.com',
      password: '123456',
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'another',
      email: 'anotheremail@email.com',
      old_password: '123456',
      password: '123123',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'teste@emaxiple.com',
      password: '123456',
    });

    expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'another',
        email: 'anotheremail@email.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'teste@emaxiple.com',
      password: '123456',
    });

    expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'another',
        email: 'anotheremail@email.com',
        password: '123123',
        old_password: 'wrong-old-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
