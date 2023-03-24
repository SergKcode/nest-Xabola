import { Test, TestingModule } from '@nestjs/testing';
import { HouseModulesController } from './house-modules.controller';
import { HouseModulesService } from './house-modules.service';

describe('HouseModulesController', () => {
  let controller: HouseModulesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HouseModulesController],
      providers: [HouseModulesService],
    }).compile();

    controller = module.get<HouseModulesController>(HouseModulesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
