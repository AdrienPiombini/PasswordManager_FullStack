import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserDto } from './dto/userDto';
import { UserMapper } from './dto/userMapper';
import { JwtService } from '@nestjs/jwt';
import { JWT, RegisterError, SALT } from '../authentication/user.utils';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private userMapper: UserMapper,
    private jwtService: JwtService,
  ) {}

  async register(userDto: UserDto): Promise<JWT | RegisterError> {
    userDto.user_password = await bcrypt.hash(
      userDto.user_password,
      await SALT,
    );

    const user = this.userMapper.dtoToEntity(userDto);
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
      exp: currentDateInSecond + 600, // + 10 MINUTES
    };
  }
}
