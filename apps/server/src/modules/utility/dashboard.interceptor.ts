import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements NestInterceptor {
  constructor(private readonly jwtService: JwtService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization.replace('Bearer ', '');
    const payload = this.jwtService.verify(token);

    if (!payload.name) {
      throw Error('A PROBLEM OCCURED, PAYLOAD IS MISSING');
    }

    request['user_credential'] = payload.name;
    return next.handle();
  }
}
