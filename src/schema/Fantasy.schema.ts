import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'fantasy' })
export class Fantasy {
  @Prop({ required: true })
  code: string;

  @Prop({ required: true })
  winner: string;

  @Prop({ required: true })
  runners_up: string;

  @Prop({ required: true })
  third: string;

  @Prop({ type: [String], required: true })
  Participants: string[];

  @Prop({ required: true })
  year: number;

  @Prop({ required: true })
  entry_fee: number;
}

export const FantasySchema = SchemaFactory.createForClass(Fantasy);
