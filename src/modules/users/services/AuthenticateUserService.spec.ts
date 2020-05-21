import AppError from '@shared/errors/AppError';

import FakeUserRepository from '../repositories/Fakes/FakeUserRepository';
import FakeHashProvider from '../providers/HashProvider/Fakes/FakesHashProvider';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import CreateUserService from '@modules/users/services/CreateUserService';

describe('AuthenticateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
      );

    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider);

    const user = await createUser.execute({
      name: 'John Die',
      email: 'fujironakombi@kombi.com',
      password: '123456',
    })

    const response = await authenticateUser.execute({
      email: 'fujironakombi@kombi.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with non existing user', async () => {
    const fakeUsersRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider);

    expect(authenticateUser.execute({
      email: 'fujironakombi@kombi.com',
      password: '123456',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const fakeUsersRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
      );

    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider);

    const user = await createUser.execute({
      name: 'John Die',
      email: 'fujironakombi@kombi.com',
      password: '123456',
    })

    const response = await authenticateUser.execute({
      email: 'fujironakombi@kombi.com',
      password: '123456',
    });

    expect(authenticateUser.execute({
      email: 'fujironakombi@kombi.com',
      password: '78910',
    })).rejects.toBeInstanceOf(AppError);
  });
})
