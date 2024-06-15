import { IsString, IsInt, IsNotEmpty, IsArray } from 'class-validator';
import { IntAddress, CreateAddressDTO } from './address.validator';
import { UUID } from 'crypto';
// readonly is used fore immutanibility that couldn't modify after initialization

export interface IntUser {
  // interface is validation for internal source, which mean will be validate data or response each method or functio
  readonly id?: UUID;
  readonly firstName: String;
  readonly lastName: String;
  readonly role: String;
  readonly email: String;
  readonly password: String;
  readonly phoneNumber: String;
  readonly isActive: Boolean;
  readonly address: IntAddress;
}

export class CreateUserDTO {
  // DTO is for validating request body
  @IsNotEmpty()
  @IsString()
  readonly firstName: String;

  @IsNotEmpty()
  @IsString()
  readonly lastName: String;

  @IsNotEmpty()
  @IsString()
  readonly role: String;

  @IsNotEmpty()
  @IsString()
  readonly email: String;

  @IsNotEmpty()
  @IsString()
  readonly password: String;

  @IsNotEmpty()
  @IsString()
  readonly confirmPassword: String;

  @IsNotEmpty()
  @IsString()
  readonly phoneNumber: String;

  @IsArray()
  readonly address: CreateAddressDTO;
}

export class LoginDTO {
  @IsNotEmpty()
  @IsString()
  readonly phoneNumber: String;

  @IsNotEmpty()
  @IsString()
  readonly password: String;
}
