import { Dashboard } from '../dashboard.entity';
import { DashboardDto } from './Dashboard.dto';

export class DashboardMapper {
  public entityToDto(entity: Dashboard): DashboardDto {
    const dto = new DashboardDto();
    dto.email = entity.email;
    dto.identifiant = entity.identifiant;
    dto.user_secret = entity.user_secret;
    dto.website = entity.website;

    return dto;
  }

  public dtoToEntity(dto: DashboardDto): Dashboard {
    const entity = new Dashboard();
    Object.assign(entity, dto);
    return entity;
  }
}
