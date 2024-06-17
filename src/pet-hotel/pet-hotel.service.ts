import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PetHotel } from 'src/models';
import { IntPetHotel } from 'src/validators/petHotel.validator';

@Injectable()
export class PetHotelService {
  constructor(
    @InjectModel(PetHotel)
    private petHotelModel: typeof PetHotel,
  ) {}

  async index(): Promise<{ rows: PetHotel[]; count: number }> {
    return await this.petHotelModel.findAndCountAll();
  }

  async create(data: {}): Promise<IntPetHotel> {
    return await this.petHotelModel.create(data);
  }
}
