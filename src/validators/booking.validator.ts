import { IsDate, IsNotEmpty, IsUUID, IsEnum } from 'class-validator';
import { UUID } from 'crypto';
import { ProposeEnum } from '../../config/enum/propose.enum';

// readonly is used fore immutanibility that couldn't modify after initialization

export interface IntBooking {
  // interface is validation for internal source, which mean will be validate data or response each method or functio
  readonly id?: UUID;
  readonly doctorId: UUID;
  readonly patientId: UUID;
  readonly dateIn: Date;
  readonly propose: ProposeEnum;
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
  readonly dateIn: Date;

  @IsNotEmpty()
  @IsEnum(ProposeEnum)
  readonly propose: ProposeEnum;
}
