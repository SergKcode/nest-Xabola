import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from '../../service/users.service';

@Injectable()
export class AdministratorGuard implements CanActivate {
  constructor(private _usersService:UsersService){
  }
  canActivate(
    context:ExecutionContext
  ): Observable<boolean> {
    const email=context.switchToHttp().getRequest()?.user?.email || ''
    return this._usersService.isAdmin(email);
  }
}

