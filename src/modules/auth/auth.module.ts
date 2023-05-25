import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { LocalStrategy } from './local-strategy/local-strategy.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
  imports: [
    UsersModule,
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
})
export class AuthModule {}
