import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../dto/login.dto';
import { Repository } from 'typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from, map, switchMap,  } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly _logger = new Logger(AuthService.name, {
    timestamp: true,
  });
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly _jwtService: JwtService,
  ) {}

  login(login: LoginDto): Observable<any> {
    const { email, password } = login;
    this._logger.log(`Validating user with email: ${email}`);
    return from(this.userRepository.findOne({ where: { email } })).pipe(
      switchMap((user) => {
        if (user) {
          return from(bcrypt.compare(password, user.password)).pipe(
            map((match) => {
              if (match) {
                const payload = { email: user.email };
                const accessToken = this._jwtService.sign(payload);
                return { accessToken };
              } else {
                throw new HttpException(
                  { message: `Credenciales no validas` },
                  HttpStatus.FORBIDDEN,
                );
              }
            }),
          );
        } else {
          throw new HttpException(
            { message: `Usuario ${email} no encontrado` },
            HttpStatus.NOT_FOUND,
          );
        }
      }),
      catchError((error) => {
        this._logger.error(`Error validating user`, error);
        throw new HttpException(
          { message: `Ocurrió un error: ${error}` },
          HttpStatus.BAD_REQUEST,
        );
      }),
    );
  }
  
}
