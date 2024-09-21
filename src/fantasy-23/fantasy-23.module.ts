import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  IndividualFantasy23,
  IndividualFantasySchema23,
} from 'src/schema/Fantasy23.schema';
import { Fantasy23Service } from './fantasy-23.service';
import { Fantasy23Controller } from './fantasy-23.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: IndividualFantasy23.name,
        schema: IndividualFantasySchema23,
      },
    ]),
  ],
  providers: [Fantasy23Service],
  controllers: [Fantasy23Controller],
})
export class Fantasy23Module {}
