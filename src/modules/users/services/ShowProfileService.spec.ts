import AppError from '@shared/errors/AppError';

import FakeUserRepository from '../repositories/Fakes/FakeUserRepository';
import ShowProfileService from '@modules/users/services/ShowProfileService';

let fakeUserRepository: FakeUserRepository;
let showProfileService: ShowProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
  
    showProfileService = new ShowProfileService(
      fakeUserRepository,
    );
  });

  it('should be able to show the profile', async () => {
    const user = await fakeUserRepository.create({
      name: 'Fujiro Nakombi',
      email: 'fujironakombi@kombi.com',
      password: '123456',
    })

    const profile = await showProfileService.execute({
      user_id: user.id,
    })

    expect(profile.name).toBe('Fujiro Nakombi');
    expect(profile.email).toBe('fujironakombi@kombi.com');
  });

  it('should not be able to show the profile from non-existing user', async () => {
    await expect(showProfileService.execute({
      user_id: 'non_existing user_id',
    })).rejects.toBeInstanceOf(AppError);
  });
});
