import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Fantasy24Service } from './fantasy-24.service';
import { Fantasy24Controller } from './fantasy-24.controller';
import {
  IndividualFantasy24,
  IndividualFantasySchema24,
} from 'src/schema/Fantasy24.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: IndividualFantasy24.name,
        schema: IndividualFantasySchema24,
      },
    ]),
  ],
  providers: [Fantasy24Service],
  controllers: [Fantasy24Controller],
})
export class Fantasy24Module {}
