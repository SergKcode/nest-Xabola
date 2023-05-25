import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { AuthService } from '../services/auth.service';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(credenctials:LoginDto): Promise<any> {
    const user = await this.authService.login(credenctials);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}