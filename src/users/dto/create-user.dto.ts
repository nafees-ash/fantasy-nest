import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  joined_date: Date;

  @IsNotEmpty()
  @IsString()
  name: string;
}
