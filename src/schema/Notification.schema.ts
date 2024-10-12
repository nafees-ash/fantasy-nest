import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'notifications' })
export class Notification {
  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  responsible: string;

  @Prop({ required: true })
  issue: string;

  @Prop({ required: true })
  message: string;

  @Prop({ required: false })
  description: string;

  @Prop({ required: true })
  resolved: boolean;

  @Prop({ required: false })
  href: string;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
