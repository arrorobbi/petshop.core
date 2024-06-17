import { Test, TestingModule } from '@nestjs/testing';
import { PetHotelController } from './pet-hotel.controller';

describe('PetHotelController', () => {
  let controller: PetHotelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PetHotelController],
    }).compile();

    controller = module.get<PetHotelController>(PetHotelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
