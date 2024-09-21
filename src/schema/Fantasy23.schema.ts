import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'fantasy_23' })
export class IndividualFantasy23 {
  @Prop({ required: true })
  username: string;

  @Prop()
  joined_date: Date;

  @Prop({ required: true })
  team_name: string;

  @Prop({ required: true })
  paid: boolean;

  @Prop()
  totalPoint: number;

  @Prop()
  matchdays: number;

  @Prop({ required: true })
  currentRank: number;

  @Prop({ required: true })
  prevRank: number;
}

export const IndividualFantasySchema23 =
  SchemaFactory.createForClass(IndividualFantasy23);
