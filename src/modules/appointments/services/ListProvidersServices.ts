import { inject, injectable } from 'tsyringe';

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
  ){}

  public async execute({ user_id }: IRequest): Promise<User[]> {
    const user = await this.userRepository.findAllProviders({
      except_user_id: user_id,
    });

    return user;
  }
}

export default ListProvidersServices;