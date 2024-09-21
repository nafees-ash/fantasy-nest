import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class UpdateInventoryDto {
  @IsString()
  owner?: string;

  @IsBoolean()
  claimed?: boolean;

  @IsString()
  club?: string;

  @IsNumber()
  value?: number;
}
