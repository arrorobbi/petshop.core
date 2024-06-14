import { UUID } from 'crypto';
import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from './user';

@Table
export class Address extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: UUID;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUIDV4 })
  userId: UUID;

  @Column({ type: DataType.STRING })
  address: String;

  @Column({ type: DataType.STRING })
  city: String;

  @Column({ type: DataType.STRING })
  postcode: String;
}
