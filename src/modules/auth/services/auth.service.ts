import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../dto/login.dto';
import { Repository } from 'typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from, map } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  login(login: LoginDto):  Observable<{ accessToken: string }> {
    const { email, password } = login;
    return from(this.userRepository.findOne({ where: { email } })).pipe(
      map((user) => {
        if (user && user.password === password) {
          const payload = { email: user.email };
          const accessToken =  this.jwtService.sign(payload);
          return {accessToken}
        } else {
          throw new Error('Invalid credentials');
        }
      }),
    );
  }
}
