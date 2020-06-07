import AppError from '@shared/errors/AppError';

import FakeUserRepository from '../repositories/Fakes/FakeUserRepository';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

let fakeUsersRepository: FakeUserRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatar: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUserRepository();
    fakeStorageProvider = new FakeStorageProvider();
  
    updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );
  });

  it('should be able to create a new avatar file', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Die',
      email: 'fujironakombi@kombi.com',
      password: '123456',
    })

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'fujiroNakombi.png',
    });

    expect(user.avatar).toBe('fujiroNakombi.png');
  });

  it('should not be able to update avatar from non existing user', async () => {
    await expect(updateUserAvatar.execute({
      user_id: 'non-existing-user',
      avatarFileName: 'fujiroNakombi.png',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old avatar when updating new one', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await fakeUsersRepository.create({
      name: 'John Die',
      email: 'fujironakombi@kombi.com',
      password: '123456',
    })

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'fujiroNakombi.png',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'fujiroNakombi2.png',
    });

    expect(deleteFile).toHaveBeenCalledWith('fujiroNakombi.png');
    expect(user.avatar).toBe('fujiroNakombi2.png');
  });

})
