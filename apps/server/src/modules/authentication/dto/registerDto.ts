import { IsNotEmpty, Length } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty({ message: 'user credential should not be empty' })
  @Length(3, 255)
  user_credential: string;

  @IsNotEmpty({ message: 'user password should not be empty' })
  @Length(3, 255)
  user_password: string;

  @IsNotEmpty({ message: 'user password should not be empty' })
  @Length(3, 255)
  confirm_password: string;
}
