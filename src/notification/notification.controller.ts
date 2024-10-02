import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import mongoose from 'mongoose';

@Controller('notifications')
export class NotificationController {
  constructor(private notificationService: NotificationService) {}

  @Post()
  createUser(@Body() createNotificationDto: CreateNotificationDto) {
    console.log(createNotificationDto);
    return this.notificationService.createNotification(createNotificationDto);
  }

  @Get()
  getNotification() {
    return this.notificationService.getNotification();
  }

  @Get(':id')
  async getNotificationById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Notification not Found', 404);
    const findNotification =
      await this.notificationService.getNotificationById(id);
    if (!findNotification)
      throw new HttpException('Notification not Found', 404);
    return findNotification;
  }
}
