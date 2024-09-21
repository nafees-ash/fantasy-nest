import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateIndividualFantasyDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @Type(() => Date)
  @IsDate()
  joined_date?: Date;

  @IsNotEmpty()
  @IsString()
  team_name: string;

  @IsNotEmpty()
  @IsBoolean()
  paid: boolean;

  @IsNumber()
  totalPoint?: number;

  @IsNumber()
  matchdays?: number;

  @IsNotEmpty()
  @IsNumber()
  currentRank: number;

  @IsNotEmpty()
  @IsNumber()
  prevRank: number;
}
