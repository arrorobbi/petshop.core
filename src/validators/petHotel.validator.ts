import {
  IsString,
  IsInt,
  IsNotEmpty,
  IsUUID,
  IsDate,
  isInt,
} from 'class-validator';
import { UUID } from 'crypto';

// readonly is used fore immutanibility that couldn't modify after initialization

export interface IntPetHotel {
  // interface is validation for internal source, which mean will be validate data or response each method or functio
  readonly id?: UUID;
  readonly bookingId: String;
  readonly dateOut: Date;
  readonly qty: Number;
}

export class CreatePetHotelDTO {
  // DTO is for validating request body
  @IsString()
  @IsUUID()
  readonly bookingId: String;

  @IsNotEmpty()
  @IsDate()
  readonly dateOut: Date;

  @IsNotEmpty()
  @IsInt()
  readonly qty: Number;
}
