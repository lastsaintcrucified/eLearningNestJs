import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRole = this.reflector.getAllAndOverride<string>('role', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRole) return true;

    const request = context.switchToHttp().getRequest();
    const user: User = request.user;
    console.log('User:', request?.user);
    // console.log('Required Role:', requiredRole);

    if (!user || user?.role !== requiredRole) {
      throw new ForbiddenException('Access denied: insufficient permissions');
    }

    return true;
  }
}
