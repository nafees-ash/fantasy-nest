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

  @Prop()
  claimed: boolean;

  @Prop()
  club: string;

  @Prop()
  quality: string;

  @Prop()
  year: number;

  @Prop()
  account: string;
}

export const InventorySchema = SchemaFactory.createForClass(Inventory);
