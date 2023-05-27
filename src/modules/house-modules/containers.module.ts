import { Module } from '@nestjs/common';
import { ContainersService } from './services/containers.service';
import { ContainersController } from './containers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Container } from './entities/containers.entity';
import { UploadImagesService } from 'src/shared/service/upload-images/upload-images.service';
import { Storage } from '@google-cloud/storage';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([Container]), ConfigModule.forRoot()],
  controllers: [ContainersController],
  providers: [
    ContainersService,
    UploadImagesService,
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
  ],
  
})
export class ContainersModule {}
