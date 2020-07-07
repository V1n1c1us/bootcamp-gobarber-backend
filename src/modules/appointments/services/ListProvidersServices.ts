import { inject, injectable } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CachProvider/models/ICacheProvider';
import IUserRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {
  user_id: string;
}

@injectable()
class ListProvidersServices {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ){}

  public async execute({ user_id }: IRequest): Promise<User[]> {
    let users = await this.cacheProvider.recoverCache<User[]>(
      `providers-list:${user_id}`
    );

    if(!users){
      users = await this.userRepository.findAllProviders({
        except_user_id: user_id,
      });
  
      await this.cacheProvider.save(`providers-list:${user_id}`, users);
    }

    return users;
  }
}

export default ListProvidersServices;