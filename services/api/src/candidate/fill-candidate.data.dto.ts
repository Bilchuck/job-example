import { Transform, Type } from 'class-transformer';
import { IsArray, IsEnum, IsNumber, IsObject, IsString } from 'class-validator';
import { TechCategory } from './candidate.entity';

export class FillCanndateDataDTO {
  @IsString()
  title: string;

  @Type(() => Number)
  @Transform(({ value }) => Number(value))
  @IsNumber()
  salary: number;

  @IsEnum(TechCategory)
  stack: TechCategory;

  @IsString()
  experience: string;

  @IsString({each: true})
  @Transform(({ value }) => value.split(','))
  skills: string[];

  @IsString()
  summary?: string;

  @IsString()
  name: string;
  
  @IsString()
  phone?: string;

  @IsString()
  email?: string;

  @IsString()
  skype?: string;
}
