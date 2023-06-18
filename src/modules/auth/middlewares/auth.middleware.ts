import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
	constructor(private readonly _jwtService: JwtService) {}

	//Extraemos el token del authorization header
	use(req: any, res: any, next: () => void) {
		const authorizationHeader = req.headers.authorization;
		if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
			const token = authorizationHeader.substring(7);
			const payload = this._jwtService.verify(token); 
			// Inyectamos el payload en la request 
			req.user = payload;
		}
		next();
	}
}
