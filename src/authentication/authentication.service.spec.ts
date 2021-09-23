import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationService } from './authentication.service';
import { UsersService } from '../users/users.service';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  const user = {
    id: 1,
    username: 'mia',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const mockUsersService = {
    create: jest.fn().mockResolvedValue(user),
    getByUsername: jest.fn().mockResolvedValue(user),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthenticationService, UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .compile();

    service = module.get<AuthenticationService>(AuthenticationService);
  });

  it('should register new user', async () => {
    const registerDto = { username: 'mia', password: 'password' };
    const newUser = await service.register(registerDto);
    expect(newUser).toEqual(user);
  });
});
