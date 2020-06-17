import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/Fakes/FakesHashProvider';
import FakeUserRepository from '../repositories/Fakes/FakeUserRepository';
import UpdateProfileService from './UpdateProfleService';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfileService: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider();
    fakeUserRepository = new FakeUserRepository();
  
    updateProfileService = new UpdateProfileService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update the profile', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'fujironakombi@kombi.com',
      password: '123456',
    })

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'John Trê',
      email: 'jhontre@kombi.com',
    });

    expect(updatedUser.name).toBe('John Trê');
    expect(updatedUser.email).toBe('jhontre@kombi.com');
  });

  it('should not be able to change to another user email', async () => {
    await fakeUserRepository.create({
      name: 'John Doe',
      email: 'fujironakombi@kombi.com',
      password: '123456',
    })

    const user = await fakeUserRepository.create({
      name: 'Teste',
      email: 'teste@kombi.com',
      password: '123456',
    });

    await expect(updateProfileService.execute({
      user_id: user.id,
      name: 'Jhone Doe',
      email: 'fujironakombi@kombi.com',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'fujironakombi@kombi.com',
      password: '123456',
    })

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'John Trê',
      email: 'jhontre@kombi.com',
      old_password: '123456',
      password: '123123'
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should not be able to update the password whitout old password', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'fujironakombi@kombi.com',
      password: '123456',
    })

    await expect(updateProfileService.execute({
      user_id: user.id,
      name: 'John Trê',
      email: 'jhontre@kombi.com',
      password: '123123'
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password whitout wrong old password', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'fujironakombi@kombi.com',
      password: '123456',
    })

    await expect(updateProfileService.execute({
      user_id: user.id,
      name: 'John Trê',
      email: 'jhontre@kombi.com',
      old_password: 'wrong-old-password',
      password: '123123'
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to show the profile from non-existing user', async () => {
    await expect(updateProfileService.execute({
      user_id: 'non_existing user_id',
      name: 'Test',
      email: 'tete@teste.com'
    })).rejects.toBeInstanceOf(AppError);
  });
});
