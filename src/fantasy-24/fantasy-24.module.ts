import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Fantasy24Service } from './fantasy-24.service';
import { Fantasy24Controller } from './fantasy-24.controller';
import {
  IndividualFantasy,
  IndividualFantasySchema,
} from 'src/schema/Fantasy23.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: IndividualFantasy.name,
        schema: IndividualFantasySchema,
      },
    ]),
  ],
  providers: [Fantasy24Service],
  controllers: [Fantasy24Controller],
})
export class Fantasy24Module {}
