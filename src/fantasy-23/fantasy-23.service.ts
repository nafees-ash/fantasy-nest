import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IndividualFantasy } from 'src/schema/Fantasy23.schema';
import { CreateIndividualFantasyDto } from './dto/create-fantasy-23.dto';

@Injectable()
export class Fantasy23Service {
  constructor(
    @InjectModel(IndividualFantasy.name)
    private fantasy23Model: Model<IndividualFantasy>,
  ) {}

  createFantasy23(createFantasy23Dto: CreateIndividualFantasyDto) {
    const newFantasy23 = new this.fantasy23Model(createFantasy23Dto);
    return newFantasy23.save();
  }

  getFantasy23() {
    return this.fantasy23Model.find();
  }

  getFantasy23ById(id: string) {
    return this.fantasy23Model.findById(id);
  }
}
