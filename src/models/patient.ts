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

@Table
export class Patient extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: UUID;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  ownerId: UUID;

  @BelongsTo(() => User)
  owner: User;

  @Column({ type: DataType.STRING })
  name: String;

  @Column({ type: DataType.NUMBER })
  age: Number;

  @Column({ type: DataType.STRING })
  petType: String;

  @Column({ type: DataType.STRING })
  colour: String;

  @Column({ type: DataType.BOOLEAN })
  gender: Boolean;

  @Column({ type: DataType.STRING })
  race: String;
}
