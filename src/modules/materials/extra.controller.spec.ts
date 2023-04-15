import { Test, TestingModule } from '@nestjs/testing';
import { ExtrasController } from './extra.controller';
import { ExtrasService } from './services/extra.service';

describe('MaterialsController', () => {
  let controller: ExtrasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExtrasController],
      providers: [ExtrasService],
    }).compile();

    controller = module.get<ExtrasController>(ExtrasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
