import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/userDto';

import { LoginResponse, RegisterResponse } from './user.utils';
import { RegisterDto } from './dto/registerDto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('/register')
  @UsePipes(ValidationPipe)
  async register(@Body() registerDto: RegisterDto): Promise<RegisterResponse> {
    const result = await this.userService.register(registerDto);

    if (!result['accessToken']) {
      return {
        status: 401,
        message: 'UNAUTHORIZED TO REGISTER',
        body: result,
      };
    }

    return {
      status: 201,
      message: 'Account created successfully',
      body: result,
    };
  }

  @Post('/login')
  @UsePipes(ValidationPipe)
  async login(@Body() userDto: UserDto): Promise<Partial<LoginResponse>> {
    const result = await this.userService.login(userDto);

    if (result == false) {
      return {
        status: 401,
        error: 'UNAUTHORIZED TO LOGIN',
        message: 'AN ERROR OCCURED, PLS VERIFY YOUR CREDRENTIALS',
      };
    }

    return {
      status: 201,
      body: result,
    };
  }
}
