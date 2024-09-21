import { IsArray, IsNumber, IsString } from 'class-validator';

export class UpdateFantasyDto {
  @IsString()
  winner?: string;

  @IsString()
  runners_up?: string;

  @IsString()
  third?: string;

  @IsArray()
  @IsString({ each: true })
  Participants?: string[];

  @IsNumber()
  entry_fee?: number;
}
