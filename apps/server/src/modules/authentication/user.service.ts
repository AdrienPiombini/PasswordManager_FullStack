import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserDto } from './dto/userDto';
import { UserMapper } from './dto/userMapper';
import { JwtService } from '@nestjs/jwt';
import { JWT, RegisterError, SALT } from '../authentication/user.utils';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/registerDto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private userMapper: UserMapper,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<JWT | RegisterError> {
    const { user_password, confirm_password } = registerDto;
    if (user_password !== confirm_password) {
      return {
        details: 'passwords do not match',
      };
    }
    registerDto.user_password = await bcrypt.hash(
      registerDto.user_password,
      await SALT,
    );

    const user = this.userMapper.dtoToEntity(registerDto);
    user.created_at = new Date().toISOString();

    try {
      await this.userRepository.save(user);
      const payload = this.buildPayload(user);

      return { accessToken: await this.jwtService.signAsync(payload) };
    } catch (e) {
      return {
        details: `${e['message']}`,
      };
    }
  }

  async login(userDto: UserDto): Promise<JWT | false> {
    const user = await this.userRepository.findOne({
      where: {
        user_credential: userDto.user_credential,
      },
    });

    if (!user) {
      return false;
    }

    const isMatch = await bcrypt.compare(
      userDto.user_password,
      user.user_password,
    );

    if (!isMatch) {
      return false;
    }

    const payload = this.buildPayload(user);

    return { accessToken: await this.jwtService.signAsync(payload) };
  }

  private buildPayload(user: User) {
    const currentDateInSecond = Math.floor(new Date().getTime() / 1000);

    return {
      sub: user.id,
      name: user.user_credential,
      iat: currentDateInSecond,
      exp: currentDateInSecond + 6000, // + 10 MINUTES
    };
  }
}
