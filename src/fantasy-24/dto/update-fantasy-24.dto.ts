import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class UpdateIndividualFantasyDto {
  @IsString()
  team_name?: string;

  @IsBoolean()
  paid?: boolean;

  @IsNumber()
  totalPoint?: number;

  @IsNumber()
  matchdays?: number;

  @IsNumber()
  currentRank?: number;

  @IsNumber()
  prevRank?: number;
}
