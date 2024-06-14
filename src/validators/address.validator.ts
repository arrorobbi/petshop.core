import { IsString, IsInt, IsNotEmpty, IsUUID } from 'class-validator';
import { UUID } from 'crypto';

// readonly is used fore immutanibility that couldn't modify after initialization

export interface IntAddress {
  // interface is validation for internal source, which mean will be validate data or response each method or functio
  readonly userId: UUID;
  readonly address: String;
  readonly city: String;
  readonly postcode: String;
}

export class CreateAddressDTO {
  // DTO is for validating request body
  @IsString()
  @IsUUID()
  readonly userId: UUID;

  @IsNotEmpty()
  @IsString()
  readonly address: String;

  @IsNotEmpty()
  @IsString()
  readonly city: String;

  @IsNotEmpty()
  @IsString()
  readonly postcode: String;
}
