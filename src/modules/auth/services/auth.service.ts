import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../dto/login.dto';
import { Repository } from 'typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from, map, switchMap } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
	private readonly _logger = new Logger(AuthService.name, {
		timestamp: true
	});
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
		private readonly _jwtService: JwtService
	) {}
	
	/**Funcion para loguearse en la aplicacion
	 * @param login
	 */
	login(login: LoginDto): Observable<any> {
		const { email, password } = login;
		this._logger.log(`Validating user with email: ${email}`);
		//Buscamos en la base de datos si existe un usuario con el email introducido
		return from(this.userRepository.findOne({ where: { email } })).pipe(
			switchMap((user) => {
				const { email, role } = user;
				if (user) {
					//Si el usuario existe utilizamos bcript para desencriptar la password y compararla por la introducida por el usuario
					return from(bcrypt.compare(password, user.password)).pipe(
						map((match) => {
							if (match) {
								//Si la contraseña es correcta devolvemos un access token
								const payload = { email, role };
								const accessToken = this._jwtService.sign(payload);
								return { accessToken };
							} else {
								//Si la contraseña no es valida devolvemos un error 403
								throw new HttpException({ message: `Credenciales no validas` }, HttpStatus.FORBIDDEN);
							}
						})
					);
				} else {
					throw new HttpException({ message: `Usuario ${email} no encontrado` }, HttpStatus.NOT_FOUND);
				}
			}),
			catchError((error) => {
				this._logger.error(`Error validating user`, error);
				throw new HttpException({ message: `Ocurrió un error: ${error}` }, HttpStatus.BAD_REQUEST);
			})
		);
	}
}
