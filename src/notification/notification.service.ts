import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Notification } from 'src/schema/Notification.schema';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification.name)
    private notificationModel: Model<Notification>,
  ) {}

  createNotification(createNotificationDto: CreateNotificationDto) {
    const newNotification = new this.notificationModel(createNotificationDto);
    return newNotification.save();
  }

  getNotification() {
    return this.notificationModel.find({ resolved: false });
  }

  getNotificationById(id: string) {
    return this.notificationModel.findById(id);
  }
}
