import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  IndividualFantasy,
  IndividualFantasySchema,
} from 'src/schema/Fantasy23.schema';
import { Fantasy23Service } from './fantasy-23.service';
import { Fantasy23Controller } from './fantasy-23.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: IndividualFantasy.name,
        schema: IndividualFantasySchema,
      },
    ]),
  ],
  providers: [Fantasy23Service],
  controllers: [Fantasy23Controller],
})
export class Fantasy23Module {}
