import { IsNumber } from 'class-validator';

export class UpdateFundDto {
  @IsNumber()
  value: number;
}
