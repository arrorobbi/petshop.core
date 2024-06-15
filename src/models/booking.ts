import { UUID } from 'crypto';
import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Booking extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: UUID;

  @Column({ type: DataType.UUIDV4 })
  doctorId: UUID;

  @Column({ type: DataType.UUIDV4 })
  patientId: UUID;

  @Column({ type: DataType.DATE })
  date: Date;

  @Column({ type: DataType.STRING })
  prpopose: String;

  @Column({ type: DataType.BOOLEAN })
  isScanned: Boolean;

  @Column({ type: DataType.BOOLEAN })
  isDone: Boolean;
}
