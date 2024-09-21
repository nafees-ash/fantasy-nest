import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IndividualFantasy } from 'src/schema/Fantasy24.schema';
import { CreateIndividualFantasyDto } from './dto/create-fantasy-24.dto';

@Injectable()
export class Fantasy24Service {
  constructor(
    @InjectModel(IndividualFantasy.name)
    private fantasy24Model: Model<IndividualFantasy>,
  ) {}

  createFantasy24(createFantasy24Dto: CreateIndividualFantasyDto) {
    const newFantasy24 = new this.fantasy24Model(createFantasy24Dto);
    return newFantasy24.save();
  }

  getFantasy24() {
    return this.fantasy24Model.find();
  }

  getFantasy24ById(id: string) {
    return this.fantasy24Model.findById(id);
  }
}
