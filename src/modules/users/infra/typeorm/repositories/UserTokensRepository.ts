import { uuid } from 'uuidv4';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserToken from '../entities/UserToken';

class UserTokensRpository implements IUserTokensRepository {
  private usersTokens: UserToken[] = [];

  public async tokenGenerate(user_id: string): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      id: uuid(),
      token: uuid(),
      user_id,
    })

    this.usersTokens.push(userToken);

    return userToken;
  } 
}

export default UserTokensRpository;
