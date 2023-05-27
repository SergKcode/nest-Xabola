import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './config/firebase.config';
import * as dotenv from 'dotenv';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const firebaseApp = initializeApp(firebaseConfig);
  dotenv.config();
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
