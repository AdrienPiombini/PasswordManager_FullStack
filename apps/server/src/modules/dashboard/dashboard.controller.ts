import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Req,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardDto } from './dto/Dashboard.dto';
import { AuthGuard } from '../utility/auth.guard';
import { Request } from 'express';
import { JwtInterceptor } from '../utility/dashboard.interceptor';
import {
  DeleteDataReponse,
  GetDataResponse,
  SaveDataReponse,
} from './dashoboard.utils';

@UseGuards(AuthGuard)
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('/')
  @UseInterceptors(JwtInterceptor)
  async getAllData(@Req() request: Request): Promise<DashboardDto[]> {
    const user_credential = request['user_credential'];
    if (!user_credential) {
      throw Error('CREDENTIAL IS MISSING ');
    }
    return await this.dashboardService.getAllData(user_credential);
  }

  @Get('/:id')
  @UseInterceptors(JwtInterceptor)
  async getData(
    @Req() request: Request,
    @Param('id') id: string,
  ): Promise<GetDataResponse> {
    const user_credential = request['user_credential'];
    if (!user_credential) {
      throw Error('CREDENTIAL IS MISSING ');
    }
    const dashboardResult = await this.dashboardService.getData(
      user_credential,
      +id,
    );
    if (!dashboardResult) {
      return {
        status: 404,
        message: 'DATA NOT FOUND',
      };
    }

    return {
      status: 200,
      body: dashboardResult,
    };
  }

  @Post('/')
  @UsePipes(ValidationPipe)
  @UseInterceptors(JwtInterceptor)
  async save(
    @Req() request: Request,
    @Body() dashboardDto: DashboardDto,
  ): Promise<SaveDataReponse> {
    const user_credential = request['user_credential'];
    if (!user_credential) {
      throw Error('CREDENTIAL IS MISSING ');
    }

    await this.dashboardService.save(user_credential, dashboardDto);

    return {
      status: 201,
      message: 'DATA CREATED',
    };
  }

  @Delete('/:id')
  @UseInterceptors(JwtInterceptor)
  async delete(
    @Req() request: Request,
    @Param('id') id: string,
  ): Promise<DeleteDataReponse> {
    const user_credential = request['user_credential'];
    if (!user_credential) {
      throw Error('CREDENTIAL IS MISSING ');
    }

    const result = await this.dashboardService.delete(user_credential, +id);

    if (!result) {
      return {
        status: 404,
        message: 'UNAUTHORIZED TO DO THIS ACTION',
      };
    }
    return {
      status: 204,
    };
  }
}
