import { IsNotEmpty, IsString, IsArray, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateFantasyDto {
  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsString()
  winner: string;

  @IsNotEmpty()
  @IsString()
  runners_up: string;

  @IsNotEmpty()
  @IsString()
  third: string;

  @IsArray()
  @IsString({ each: true })
  Participants: string[];

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  year: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  entry_fee: number;
}
