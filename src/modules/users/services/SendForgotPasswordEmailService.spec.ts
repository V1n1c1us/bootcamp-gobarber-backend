import AppError from '@shared/errors/AppError';


import FakeUserRepository from '../repositories/Fakes/FakeUserRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUserTokensRepository from '../repositories/Fakes/FakeUserTokensRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let fakeMailProvider: FakeMailProvider;
let fakeUsersRepository: FakeUserRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUserRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository,
    );
  });

  it('it should be able to recover the password using the email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUsersRepository.create({
      name: 'Fujiro Nakombi',
      email: 'fujironakombi@kombi.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'fujironakombi@kombi.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('it should be able to recover a non-existing user password', async () => {
    await  expect(
      sendForgotPasswordEmail.execute({
      email: 'fujironakombi@kombi.com',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgot password token', async () => {
    
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'tokenGenerate');

    const user = await fakeUsersRepository.create({
      name: 'Fujiro Nakombi',
      email: 'fujironakombi@kombi.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'fujironakombi@kombi.com',
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
})
