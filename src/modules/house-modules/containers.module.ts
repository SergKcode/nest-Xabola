import { Module } from '@nestjs/common';
import { ContainersService } from './services/containers.service';
import { ContainersController } from './containers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Container } from './entities/containers.entity';

@Module({
  controllers: [ContainersController],
  providers: [ContainersService],
  imports: [TypeOrmModule.forFeature([Container])],
})
export class ContainersModule {}
