import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
	constructor(private readonly _jwtService: JwtService) {}

	use(req: any, res: any, next: () => void) {
		// Obtén el token de autorización del encabezado
		const authorizationHeader = req.headers.authorization;
		if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
			// Extrae el token de autorización de la cabecera
			const token = authorizationHeader.substring(7);
			// Verifica y decodifica el token para obtener el payload
			const payload = this._jwtService.verify(token); // Implementa esta función para decodificar tu token
			// Inyecta el payload en la solicitud para acceder a él en otros controladores o middlewares
			req.user = payload;
		}
		next();
	}
}
