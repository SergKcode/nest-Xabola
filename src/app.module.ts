import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { Storage } from '@google-cloud/storage';
import { FirebaseImageService } from './shared/service/firebase-images/firebase-images.service';
import { ProductsModule } from './modules/products/products.module';
import { ProductsController } from './modules/products/products.controller';
import { AuthMiddleware } from './modules/auth/middlewares/auth.middleware';
import { UsersController } from './modules/users/users.controller';

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
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
    UsersModule,
    AuthModule,
    ProductsModule,
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
    FirebaseImageService,
  ],
  controllers: [AppController],
  exports: [Storage],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(ProductsController, UsersController);
  }
}