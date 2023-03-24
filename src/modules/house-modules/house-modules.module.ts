import { Module } from '@nestjs/common';
import { HouseModulesService } from './house-modules.service';
import { HouseModulesController } from './house-modules.controller';

@Module({
  controllers: [HouseModulesController],
  providers: [HouseModulesService]
})
export class HouseModulesModule {}
