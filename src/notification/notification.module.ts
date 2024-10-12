import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import {
  Notification,
  NotificationSchema,
} from 'src/schema/Notification.schema';
import { Fantasy23Module } from 'src/fantasy-23/fantasy-23.module';
import { Fantasy24Module } from 'src/fantasy-24/fantasy-24.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Notification.name,
        schema: NotificationSchema,
      },
    ]),
    Fantasy23Module,
    Fantasy24Module,
  ],
  providers: [NotificationService],
  controllers: [NotificationController],
})
export class NotificationModule {}
