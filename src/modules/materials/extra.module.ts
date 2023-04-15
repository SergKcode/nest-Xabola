import { Module } from '@nestjs/common';
import { ExtrasService } from './services/extra.service';
import { ExtrasController } from './extra.controller';
import { Extra } from './entities/extras.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ExtrasController],
  providers: [ExtrasService],
  imports: [TypeOrmModule.forFeature([Extra])],
})
export class MaterialsModule {}
