import { UUID } from 'crypto';
import {
  Table,
  Column,
  Model,
  DataType,
  BeforeSave,
  BeforeBulkCreate,
  HasMany,
  ForeignKey,
} from 'sequelize-typescript';
import { BcryptService } from '../misc/bcrypt';
import { Address } from './address';

@Table
export class User extends Model {
  @HasMany(() => Address)
  address: Address;

  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: UUID;

  @Column({ type: DataType.STRING })
  firstName: String;

  @Column({ type: DataType.STRING })
  lastName: String;

  @Column({ type: DataType.STRING })
  role: String;

  @Column({ type: DataType.STRING })
  email: String;

  @Column({ type: DataType.STRING })
  password: String;

  @Column({ type: DataType.STRING })
  phoneNumber: String;

  @Column({ type: DataType.BOOLEAN })
  isActive: Boolean;

  @BeforeSave
  static async hashPassword(instance: User) {
    if (instance.changed('password')) {
      instance.password = await BcryptService.bcrypthash(instance.password);
    }
  }

  @BeforeBulkCreate
  static async hashbulkPassword(instance: User) {
    if (instance.changed('password')) {
      instance.password = await BcryptService.bcrypthash(instance.password);
    }
  }
}
