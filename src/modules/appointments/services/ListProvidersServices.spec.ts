import AppError from '@shared/errors/AppError';

import FakeUserRepository from '@modules/users/repositories/Fakes/FakeUserRepository';
import ListProvidersServices from './ListProvidersServices';
import FakeCacheProvider from '@shared/container/providers/CachProvider/fakes/FakeCacheProvider';

let fakeUserRepository: FakeUserRepository;
let listProviders: ListProvidersServices;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listProviders = new ListProvidersServices(
      fakeUserRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list the providers', async () => {
    const user1 = await fakeUserRepository.create({
      name: 'Fujiro Nakombi',
      email: 'fujironakombi@kombi.com',
      password: '123456',
    });

    const user2 = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@kombi.com',
      password: '123456',
    });

    const user3 = await fakeUserRepository.create({
      name: 'John Trê',
      email: 'johntre@kombi.com',
      password: '123456',
    });

    const loggedUser = await fakeUserRepository.create({
      name: 'John Qua',
      email: 'johnqua@kombi.com',
      password: '123456',
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    })

    expect(providers).toEqual([
      user1,
      user2,
      user3,
    ]);
  });
});
