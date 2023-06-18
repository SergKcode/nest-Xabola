import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolAllowedGuard implements CanActivate {
	constructor(private readonly _reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean | Observable<boolean> {
		//Coge del decorador Rol los roles permitidos
		const allowedRoles = this._reflector.get<string[]>('roles', context.getHandler());
		const request = context.switchToHttp().getRequest();
		const user = request.user;

		if (!allowedRoles) {
			return true;
		}

		// Si el usario no tiene el rol autorizado se le deniega el acceso
		if (!user || !allowedRoles.includes(user.role)) {
			return false;
		}

		return true;
	}
}
