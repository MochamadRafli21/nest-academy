import {
  ArrayMaxSize,
  ArrayMinSize,
    IsArray,
  IsEnum,
  IsDefined,
  IsNotEmptyObject,
  IsNotEmpty,
  IsObject,
  IsString,
  ValidateNested
} from 'class-validator';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';

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

export class CreateQuestionsDto {
    @IsString()
    @IsNotEmpty()
    readonly title: string;
    @IsArray()
    @ValidateNested({ each: true })
    @IsDefined()
    @IsNotEmptyObject()
    @IsObject()
    @Type(() => SectionsCreateManyInputDto)
    readonly sections: SectionsCreateManyInputDto[];
    @IsString()
    @IsNotEmpty()
    readonly options_a: string;
    @IsString()
    @IsNotEmpty()
    readonly options_b: string;
    @IsString()
    @IsNotEmpty()
    readonly options_c: string;
    @IsString()
    @IsNotEmpty()
    readonly options_d: string;
    @IsString()
    @IsNotEmpty()
    readonly options_e: string;
    @IsString()
    readonly answer: string;
}