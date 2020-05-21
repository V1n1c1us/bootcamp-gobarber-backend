import AppError from '@shared/errors/AppError';


import FakeUserRepository from '../repositories/Fakes/FakeUserRepository';
import FakerHashProvider from '../providers/HashProvider/Fakes/FakesHashProvider';
import CreateUserService from '@modules/users/services/CreateUserService';


describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUserRepository();
    const fakeHashProvider = new FakerHashProvider();

    const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);

    const appointment = await createUser.execute({
      name: 'Fujiro Nakombi',
      email: 'fujironakombi@kombi.com',
      password: '123456',
    });

    expect(appointment).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email from another', async () => {
    const fakeUsersRepository = new FakeUserRepository();
    const fakeHashProvider = new FakerHashProvider();

    const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);

    await createUser.execute({
      name: 'Fujiro Nakombi',
      email: 'fujironakombi@kombi.com',
      password: '123456',
    });

    expect(createUser.execute({
      name: 'Fujiro Nakombi',
      email: 'fujironakombi@kombi.com',
      password: '123456',
    })).rejects.toBeInstanceOf(AppError);
  });
})
