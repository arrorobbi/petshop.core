import { UUID } from 'crypto';
import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from './user';
import { Patient } from './patient';

@Table
export class Item extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: UUID;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUIDV4 })
  userId: UUID;

  @BelongsTo(() => User)
  user: User;

  @Column({ type: DataType.DATE })
  dateIn: Date;

  @Column({ type: DataType.NUMBER })
  qty: Number;

  @Column({ type: DataType.DATE })
  expired: Date;

  @Column({ type: DataType.STRING })
  batchCode: String;

  @Column({ type: DataType.STRING })
  factory: String;

  @Column({ type: DataType.STRING })
  type: String;

  @Column({ type: DataType.FLOAT })
  price: Number;
}
