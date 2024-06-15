import {
  IsString,
  IsInt,
  IsNotEmpty,
  IsUUID,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { UUID } from 'crypto';

// readonly is used fore immutanibility that couldn't modify after initialization

export interface IntPatient {
  // interface is validation for internal source, which mean will be validate data or response each method or function
  readonly id?: UUID;
  readonly ownerId: UUID;
  readonly name: String;
  readonly age: Number;
  readonly petType: String;
  readonly colour: String;
  readonly gender: Boolean;
  readonly race: String;
}

export class CreatePatientDTO {
  // DTO is for validating request body

  @IsNotEmpty()
  @IsString()
  readonly name: String;

  @IsNotEmpty()
  @IsInt()
  readonly age: Number;

  @IsNotEmpty()
  @IsString()
  readonly petType: String;

  @IsNotEmpty()
  @IsString()
  readonly colour: String;

  @IsNotEmpty()
  @IsBoolean()
  readonly gender: Boolean;

  @IsNotEmpty()
  @IsString()
  readonly race: String;
}

export class UpdatePatientDTO {
  // DTO is for validating request body

  @IsOptional()
  @IsString()
  readonly name: String;

  @IsOptional()
  @IsInt()
  readonly age: Number;

  @IsOptional()
  @IsString()
  readonly petType: String;

  @IsOptional()
  @IsString()
  readonly colour: String;

  @IsOptional()
  @IsBoolean()
  readonly gender: Boolean;

  @IsOptional()
  @IsString()
  readonly race: String;
}
