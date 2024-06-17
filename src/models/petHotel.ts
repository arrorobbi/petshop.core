import { UUID } from 'crypto';
import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Booking } from './booking';

@Table
export class PetHotel extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: UUID;

  @ForeignKey(() => Booking)
  @Column({ type: DataType.STRING })
  bookingId: String;

  @BelongsTo(() => Booking)
  booking: Booking;

  @Column({ type: DataType.DATE })
  dateOut: Date;

  @Column({ type: DataType.NUMBER })
  qty: Number;
}
