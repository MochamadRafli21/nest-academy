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
    @IsArray()
    @ArrayMinSize(5)
    @ArrayMaxSize(5)
    @ValidateNested({ each: true })
    @IsDefined()
    @IsNotEmptyObject()
    @IsObject()
    @Type(() => OptionsCreateManyInputDto)
    readonly options: OptionsCreateManyInputDto[];
    @IsString()
    readonly answer: string;
}