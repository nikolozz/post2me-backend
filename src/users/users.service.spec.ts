import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';

describe('UsersService', () => {
  let service: UsersService;
  const user = {
    id: 1,
    username: 'mia',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const mockRepository = {
    create: jest.fn().mockResolvedValue(user),
    getByUsername: jest.fn().mockResolvedValue(user),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, UsersRepository],
    })
      .overrideProvider(UsersRepository)
      .useValue(mockRepository)
      .compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should create a user', async () => {
    const createdUser = await service.create({
      username: 'mia',
      password: 'mia',
    });

    expect(createdUser).toEqual(user);
  });

  it('should return user by username', async () => {
    const username = 'mia';
    const userByUsername = await service.getByUsername(username);
    const getByUsernameSpy = jest.spyOn(mockRepository, 'getByUsername');

    expect(getByUsernameSpy).toBeCalledWith(username);
    expect(userByUsername).toEqual(user);
  });
});
