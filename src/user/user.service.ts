import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../models/user';
import { Address } from '../models/address';
import { IntUser } from '../validators/user.validator';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private UserModel: typeof User,
    @InjectModel(Address)
    private addressModel: typeof Address,
  ) {}

  async index(): Promise<{ rows: IntUser[]; count: Number }> {
    return this.UserModel.findAndCountAll();
  }

  async create(data: { user: User; address: Address }): Promise<IntUser> {
    // const (address: [], ...data:{}) = data
    const { address, ...userData } = data;
    console.log(address);
    return;

    // return this.UserModel.create({
    //     {
    //         ...data,
    //         address: [...address],
    //       },
    //       {
    //         include: ["address"]
    //       }
    // });
  }
}
