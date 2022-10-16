import {
    IsEnum,
    IsNotEmpty,
    IsString,
    IsEmail
  } from 'class-validator';
  
  export enum sections_type{
      PARAGRAPH= 'PARAGRAPH',
      VIDEO= 'VIDEO',
      IMAGE= 'IMAGE'
  }
  
  export enum options_name{
    A= 'A',
    B= 'B',
    C= 'C',
    D= 'D',
    E= 'E'
  }
  
  
  export class OptionsCreateManyInputDto {
    @IsString()
    readonly value: string
    @IsEnum(options_name)
    @IsNotEmpty()
    readonly option_name: options_name 
  }
  
  export class SectionsCreateManyInputDto {
    @IsEnum(sections_type)
    @IsNotEmpty()
    type: sections_type
    position: number
  }
  
  export class CreateUserDto {
      @IsString()
      @IsNotEmpty()
      @IsEmail()
      readonly email: string;
      @IsString()
      @IsNotEmpty()
      readonly fullname: string;
      @IsString()
      @IsNotEmpty()
      readonly password: string;
      readonly sessionId: string;
  }