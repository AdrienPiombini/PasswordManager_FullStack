import { DashboardDto } from './dto/Dashboard.dto';

export type GetDataResponse = {
  status: 200 | 404;
  message?: 'DATA NOT FOUND';
  body?: DashboardDto;
};

export type SaveDataReponse = {
  status: 201;
  message?: 'DATA CREATED';
};

export type DeleteDataReponse = {
  status: 204 | 404;
  message?: 'UNAUTHORIZED TO DO THIS ACTION';
};
