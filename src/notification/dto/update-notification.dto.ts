import { IsBoolean, IsString } from 'class-validator';

export class UpdateNotificationDto {
  @IsString()
  type: string;
  @IsString()
  message: string;

  @IsBoolean()
  resolved: boolean;

  @IsString()
  href: string;
}
