import AppError from '@shared/errors/AppError';


import FakeUserRepository from '../repositories/Fakes/FakeUserRepository';
import FakerHashProvider from '../providers/HashProvider/Fakes/FakesHashProvider';
import CreateUserService from '@modules/users/services/CreateUserService';

let fakeUsersRepository:  FakeUserRepository;
let fakeHashProvider: FakerHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUserRepository();
    fakeHashProvider = new FakerHashProvider();

     createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to create a new user', async () => {
     
     const appointment = await createUser.execute({
      name: 'Fujiro Nakombi',
      email: 'fujironakombi@kombi.com',
      password: '123456',
    });

    expect(appointment).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email from another', async () => {
    await createUser.execute({
      name: 'Fujiro Nakombi',
      email: 'fujironakombi@kombi.com',
      password: '123456',
    });

    await expect(createUser.execute({
      name: 'Fujiro Nakombi',
      email: 'fujironakombi@kombi.com',
      password: '123456',
    })).rejects.toBeInstanceOf(AppError);
  });
})
