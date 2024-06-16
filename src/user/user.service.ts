import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User, Address } from '../models';
import { IntUser } from '../validators/user.validator';
import { CreateAddressDTO } from '../validators/address.validator';
import { UUID } from 'crypto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private UserModel: typeof User,
    @InjectModel(Address)
    private AddressModel: typeof Address,
  ) {}

  async index(): Promise<{ rows: IntUser[]; count: Number }> {
    return await this.UserModel.findAndCountAll({
      include: [{ model: Address }],
    });
  }

  async findOne(phoneNumber: String): Promise<IntUser> {
    return await this.UserModel.findOne({
      where: { phoneNumber: phoneNumber },
    });
  }

  async findById(id: UUID): Promise<IntUser> {
    return await this.UserModel.findByPk(id);
  }

  async create(data: { address: CreateAddressDTO }): Promise<IntUser> {
    const { address, ...userData } = data;

    return await this.UserModel.create(
      {
        ...userData,
        address: address,
      },
      { include: [{ model: Address }] },
    );
  }
}
