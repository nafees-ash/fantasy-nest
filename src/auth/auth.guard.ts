import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private configService: ConfigService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const method = request.method;

    if (method !== 'POST' && method !== 'PATCH') {
      return true;
    }

    const token = request.headers['authorization'];
    if (!token) {
      return false;
    }

    return this.verifyToken(token);
  }

  private verifyToken(token: string): boolean {
    const validToken = this.configService.get<string>('TOKEN');
    return token === validToken;
  }
}
