import { Injectable } from '@nestjs/common';
import { User } from '../user.entity';
import { UserDto } from './userDto';

Injectable();
export class UserMapper {
  public entityToDto(entity: User): UserDto {
    const dto = new UserDto();
    dto.user_credential = entity.user_credential;
    dto.user_password = entity.user_password;

    return dto;
  }

  public dtoToEntity(dto: UserDto): User {
    const entity = new User();
    entity.user_credential = dto.user_credential;
    entity.user_password = dto.user_password;
    entity.updated_at = new Date().toISOString();

    return entity;
  }
}
