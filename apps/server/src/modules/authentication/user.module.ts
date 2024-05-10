import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserMapper } from './dto/userMapper';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from './user.utils';

@Module({
  controllers: [UserController],
  providers: [UserService, UserMapper],
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: JWT_SECRET.secret,
    }),
  ],
})
export class UserModule {}
