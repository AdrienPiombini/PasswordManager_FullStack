import { IsNotEmpty, Length } from 'class-validator';

export class DashboardDto {
  @IsNotEmpty()
  @Length(1, 255)
  identifiant: string;

  @Length(1, 255)
  email: string;

  @Length(1, 255)
  website: string;

  @Length(1, 255)
  user_secret: string;
}
