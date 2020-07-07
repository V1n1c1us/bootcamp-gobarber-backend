import AppError from '@shared/errors/AppError';

import FakeUserRepository from '../repositories/Fakes/FakeUserRepository';
import FakeHashProvider from '../providers/HashProvider/Fakes/FakesHashProvider';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

let fakeUsersRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();

    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider);
  });

  it('should be able to authenticate', async () => {
    const user = await fakeUsersRepository.create({
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
    await expect(authenticateUser.execute({
      email: 'fujironakombi@kombi.com',
      password: '123456',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await fakeUsersRepository.create({
      name: 'John Die',
      email: 'fujironakombi@kombi.com',
      password: '123456',
    })

    const response = await authenticateUser.execute({
      email: 'fujironakombi@kombi.com',
      password: '123456',
    });

    await expect(authenticateUser.execute({
      email: 'fujironakombi@kombi.com',
      password: '78910',
    })).rejects.toBeInstanceOf(AppError);
  });
})
