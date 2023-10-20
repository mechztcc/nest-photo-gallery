import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class HttpInterceptor implements NestInterceptor {
  constructor(private jwtService: JwtService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    const token = request.headers['authorization'];

    const decoded = this.jwtService.decode(token);

    if (!token || !decoded) {
      throw new UnauthorizedException('Token has not provided');
    }

    request.headers['user'] = decoded;

    return next.handle();
  }
}
