import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dashboard } from './dashboard.entity';

import { DashboardDto } from './dto/Dashboard.dto';
import { User } from '../authentication/user.entity';
import { DashboardMapper } from './dto/dashboardMapper';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Dashboard)
    private dashboardRepository: Repository<Dashboard>,
    private dashboardMapper: DashboardMapper,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getAllData(user_credential: string): Promise<DashboardDto[]> {
    const user = User.builder({ user_credential });
    const result = await this.dashboardRepository.find({
      where: {
        user_credential: user,
      },
    });

    return result.map((x) => this.dashboardMapper.entityToDto(x));
  }

  async getData(user_credential: string, id: number): Promise<DashboardDto> {
    const user = await this.userRepository.findOne({
      where: { user_credential },
    });

    const result = await this.dashboardRepository.findOne({
      where: {
        user_credential: user,
        id,
      },
    });

    return this.dashboardMapper.entityToDto(result);
  }

  async save(
    user_credential: string,
    dashboardDto: DashboardDto,
  ): Promise<void> {
    const entity = this.dashboardMapper.dtoToEntity(dashboardDto);

    const user = await this.userRepository.findOne({
      where: { user_credential },
    });

    entity.user_credential = user;
    await this.dashboardRepository.save(entity);
  }

  async delete(user_credential: string, id: number): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: { user_credential },
    });

    const entity = await this.dashboardRepository.findOne({
      where: {
        user_credential: user,
        id: id,
      },
    });

    if (!entity) {
      return false;
    }

    await this.dashboardRepository.remove(entity);
    return true;
  }
}
