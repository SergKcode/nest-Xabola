import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { UserRoles } from 'src/modules/users/models/users.model';

@Injectable()
export class IsAdminGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const isAdminUser = this.reflector.get<string>('role', context.getHandler()) === UserRoles.ADMIN
    const request = context.switchToHttp().getRequest();
    const hasToken = !!request.headers.authorization;

    return hasToken && isAdminUser;
  }
}