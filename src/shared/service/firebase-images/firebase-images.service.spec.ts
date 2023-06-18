import { Test, TestingModule } from '@nestjs/testing';
import { FirebaseImageService } from './firebase-images.service';

describe('UploadImagesService', () => {
  let service: FirebaseImageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FirebaseImageService],
    }).compile();

    service = module.get<FirebaseImageService>(FirebaseImageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
