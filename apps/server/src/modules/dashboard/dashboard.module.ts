import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Dashboard } from './dashboard.entity';
import { JwtInterceptor } from '../utility/dashboard.interceptor';
import { DashboardMapper } from './dto/dashboardMapper';
import { User } from '../authentication/user.entity';

@Module({
  controllers: [DashboardController],
  providers: [DashboardService, JwtInterceptor, DashboardMapper],
  imports: [TypeOrmModule.forFeature([Dashboard, User])],
})
export class DashboardModule {}
