import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFantasyDto } from './dto/create-fantasy.dto';
import { Fantasy } from 'src/schema/Fantasy.schema';

@Injectable()
export class FantasyService {
  constructor(
    @InjectModel(Fantasy.name) private fantasyModel: Model<Fantasy>,
  ) {}

  createFantasy(createFantasyDto: CreateFantasyDto) {
    const newFantasy = new this.fantasyModel(createFantasyDto);
    return newFantasy.save();
  }

  getFantasy() {
    return this.fantasyModel.find();
  }
}
