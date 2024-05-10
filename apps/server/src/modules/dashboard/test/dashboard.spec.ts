import { Test } from '@nestjs/testing';
import { DashboardController } from '../dashboard.controller';
import { DashboardService } from '../dashboard.service';
import { DashboardMapper } from '../dto/dashboardMapper';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserRepositoryMock } from '../../authentication/test/userRepositoryMock';
import { User } from '../../authentication/user.entity';
import { Dashboard } from '../dashboard.entity';
import { DashboardRepositoryMock } from './dashboardRepositoryMock';
import { AuthGuard } from '../../utility/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { DashboardDto } from '../dto/Dashboard.dto';

describe('DashboardController', () => {
  let controller: DashboardController;
  class repoTest {
    findOne = jest.fn().mockReturnValue({ user_credential: 'testUser' });
  }

  beforeEach(async () => {
    const jwtServiceMock = {
      verifyAsync: jest.fn().mockReturnValue(true),
    };
    const moduleRef = await Test.createTestingModule({
      controllers: [DashboardController],
      providers: [
        DashboardService,
        DashboardMapper,
        {
          provide: getRepositoryToken(User),
          useClass: UserRepositoryMock,
        },
        {
          provide: AuthGuard,
          useValue: true,
        },
        { provide: JwtService, useValue: jwtServiceMock },
        {
          provide: getRepositoryToken(Dashboard),
          useClass: DashboardRepositoryMock,
        },
        {
          provide: getRepositoryToken(User),
          useClass: repoTest,
        },
      ],
    }).compile();
    controller = moduleRef.get(DashboardController);
  });

  describe('CRUD DASHBOARD', () => {
    const request: Request = {
      user_credential: 'testUser',
    } as unknown as Request;

    const dto: DashboardDto = {
      email: 'email',
      identifiant: 'identifiant',
      user_secret: 'secret',
      website: 'website',
    };
    const dto2: DashboardDto = {
      email: 'email2',
      identifiant: 'identifiant2',
      user_secret: 'secret2',
      website: 'website2',
    };

    it('should get all user data', async () => {
      await controller.save(request, dto);
      await controller.save(request, dto2);
      const result = await controller.getAllData(request);

      expect(result.length).toBe(2);
      expect(result[0]).toEqual(dto);
    });

    it('should get first data', async () => {
      await controller.save(request, dto);
      await controller.save(request, dto2);

      const result = await controller.getData(request, '1');

      expect(result).toEqual({
        status: 200,
        body: dto,
      });
    });

    it('should save data', async () => {
      const result = await controller.save(request, dto);

      expect(result).toEqual({
        status: 201,
        message: 'DATA CREATED',
      });
    });

    it('should delete data', async () => {
      await controller.save(request, dto);

      const result = await controller.delete(request, '1');

      expect(result).toEqual({
        status: 204,
      });
    });
  });
});
