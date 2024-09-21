import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateInventoryDto {
  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  value: number;

  @IsNotEmpty()
  @IsString()
  owner: string;

  @IsNotEmpty()
  claimed: boolean;

  @IsString()
  club?: string;

  @IsNotEmpty()
  @IsString()
  quality: string;

  @IsNotEmpty()
  @IsNumber()
  year: number;
}
