import { Test } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { UserMapper } from '../dto/userMapper';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user.entity';
import { UserRepositoryMock } from './userRepositoryMock';

import { getRepositoryToken } from '@nestjs/typeorm';
import { UserDto } from '../dto/userDto';

describe('UserController', () => {
  let controller: UserController;

  let userDto: UserDto;
  beforeEach(async () => {
    const jwtServiceMock = {
      signAsync: jest.fn().mockReturnValue({ accessToken: 'Jwt' }),
    };

    userDto = {
      user_credential: 'test',
      user_password: 'secret',
    };

    const moduleRef = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        UserMapper,
        { provide: JwtService, useValue: jwtServiceMock },
        {
          provide: getRepositoryToken(User),
          useClass: UserRepositoryMock,
        },
      ],
    }).compile();
    controller = moduleRef.get(UserController);
  });

  describe('REGISTER', () => {
    it('should register a user', async () => {
      const result = await controller.register(userDto);
      expect(result.status).toBe(201);
    });

    it('should not register a user twice', async () => {
      await controller.register(userDto);
      const result = await controller.register(userDto);

      expect(result.status).toBe(401);
    });
  });

  describe('LOGIN', () => {
    it('should login a user', async () => {
      await controller.register(userDto);
      //can't use variable because its modified by ref durign register process
      const result = await controller.login({
        user_credential: 'test',
        user_password: 'secret',
      });
      expect(result.status).toBe(201);
    });

    it('should not login a user twice', async () => {
      const result = await controller.login(userDto);
      expect(result.status).toBe(401);
    });
  });
});
