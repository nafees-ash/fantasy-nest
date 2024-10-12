import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Notification } from 'src/schema/Notification.schema';
import { CreateNotificationDto } from './dto/create-notification.dto';

import { IndividualFantasy23 } from 'src/schema/Fantasy23.schema';
import { IndividualFantasy24 } from 'src/schema/Fantasy24.schema';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification.name)
    private notificationModel: Model<Notification>,
    @InjectModel(IndividualFantasy23.name)
    private fantasy23Model: Model<IndividualFantasy23>,
    @InjectModel(IndividualFantasy24.name)
    private fantasy24Model: Model<IndividualFantasy24>,
  ) {}

  createNotification(createNotificationDto: CreateNotificationDto) {
    const newNotification = new this.notificationModel(createNotificationDto);
    return newNotification.save();
  }

  async getNotification() {
    const notifications = await this.notificationModel.find({
      resolved: false,
      type: 'global',
    });

    const newNoti = await Promise.all(
      notifications.map(async (item) => {
        if (item.issue === 'payment') {
          const responsible = item.responsible;
          let description = '';

          if (responsible === 'fantasy_23') {
            const unpaid = await this.fantasy23Model.find(
              { paid: false },
              { team_name: 1 },
            );

            const unpaidTeams = unpaid.map((team) => team.team_name);
            description = `User(s) who need(s) to pay: ${unpaidTeams.join(', ')}`;
          }

          if (responsible === 'fantasy_24') {
            const unpaid = await this.fantasy24Model.find(
              { paid: false },
              { team_name: 1 },
            );

            const unpaidTeams = unpaid.map((team) => team.team_name);
            description = `User(s) who need(s) to pay: ${unpaidTeams.join(', ')}`;
          }

          return {
            id: item.id,
            message: item.message,
            description,
            href: item.href,
          };
        }
        return item;
      }),
    );
    return newNoti;
  }

  getAllNotification() {
    return this.notificationModel.find();
  }

  getNotificationById(id: string) {
    return this.notificationModel.findById(id);
  }
}
