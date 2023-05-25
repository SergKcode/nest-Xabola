import { Controller, Post, Body, Get } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { Observable, of } from 'rxjs';
import { AuthService } from './services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  login(@Body() loginDto: LoginDto): Observable<any> {
    return this.authService.login(loginDto);
  }

}
