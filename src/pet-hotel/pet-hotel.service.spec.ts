import { Test, TestingModule } from '@nestjs/testing';
import { PetHotelService } from './pet-hotel.service';

describe('PetHotelService', () => {
  let service: PetHotelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PetHotelService],
    }).compile();

    service = module.get<PetHotelService>(PetHotelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
