import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'inventory' })
export class Inventory {
  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  value: number;

  @Prop({ required: true })
  owner: string;

  @Prop({ required: true })
  claimed: boolean;

  @Prop()
  club: string;

  @Prop({ required: true })
  quality: string;

  @Prop({ required: true })
  year: number;
}

export const InventorySchema = SchemaFactory.createForClass(Inventory);
