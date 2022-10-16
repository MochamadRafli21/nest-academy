import {
    IsNotEmpty,
    IsString,
    IsEmail
  } from 'class-validator';
  
  export class UserLoginDto {
      @IsString()
      @IsNotEmpty()
      @IsEmail()
      readonly email: string;
      @IsString()
      @IsNotEmpty()
      readonly password: string;
  }