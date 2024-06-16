import { IsDate, IsNotEmpty, IsUUID, IsEnum, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { UUID } from 'crypto';
import { ProposeEnum } from '../../config/enum/propose.enum';
import { IntUser } from './user.validator';
import { IntPatient } from './patient.validator';

// readonly is used fore immutanibility that couldn't modify after initialization

export interface IntBooking {
  // interface is validation for internal source, which mean will be validate data or response each method or functio
  readonly id?: String;
  readonly doctorId: UUID;
  readonly patientId: UUID;
  readonly date: Date;
  readonly queueNumber: Number;
  readonly propose: String;
  readonly isScanned: Boolean;
  readonly isDone: Boolean;
  readonly doctor?: IntUser;
  readonly patient?: IntPatient;
}

export class CreateBookingDTO {
  // DTO is for validating request body
  @IsNotEmpty()
  @IsUUID()
  readonly doctorId: UUID;

  @IsNotEmpty()
  @IsUUID()
  readonly patientId: UUID;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  readonly date: Date;

  @IsNotEmpty()
  @IsEnum(ProposeEnum)
  readonly propose: ProposeEnum;
}
