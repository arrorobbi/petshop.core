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
export class Booking extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: UUID;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUIDV4 })
  doctorId: UUID;

  @BelongsTo(() => User)
  doctor: User;

  @ForeignKey(() => Patient)
  @Column({ type: DataType.UUIDV4 })
  patientId: UUID;

  @BelongsTo(() => Patient)
  patient: Patient;

  @Column({ type: DataType.DATE })
  date: Date;

  @Column({ type: DataType.NUMBER })
  queueNumber: Number;

  @Column({ type: DataType.STRING })
  propose: String;

  @Column({ type: DataType.BOOLEAN })
  isScanned: Boolean;

  @Column({ type: DataType.BOOLEAN })
  isDone: Boolean;
}
