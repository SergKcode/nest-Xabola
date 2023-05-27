import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContainersModule } from './modules/house-modules/containers.module';
import { UsersModule } from './modules/users/users.module';
import { MaterialsModule } from './modules/materials/extra.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { Storage } from '@google-cloud/storage';
import { UploadImagesService } from './shared/service/upload-images/upload-images.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: { expiresIn: '60s' },
    }),
    UsersModule,
    ContainersModule,
    MaterialsModule,
    AuthModule,
  ],
  providers: [
    AppService,
    {
      provide: Storage,
      useValue: new Storage({
        projectId: process.env.FIREBASE_PROJECT_ID,
        credentials: {
          client_email: process.env.FIREBASE_CLIENT_EMAIL,
          private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        },
      }),
    },
    UploadImagesService,
  ],
  controllers: [AppController],
  exports: [Storage],
})
export class AppModule {}
