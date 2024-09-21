import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
} from '@nestjs/common';
import { Fantasy24Service } from './fantasy-24.service';
import { CreateIndividualFantasyDto } from './dto/create-fantasy-24.dto';
import mongoose from 'mongoose';

@Controller('fantasy/24')
export class Fantasy24Controller {
  constructor(private fantasy24Service: Fantasy24Service) {}

  @Post()
  createFantasy24(@Body() createFantasy24Dto: CreateIndividualFantasyDto) {
    console.log(createFantasy24Dto);
    return this.fantasy24Service.createFantasy24(createFantasy24Dto);
  }

  @Get()
  getFantasy24() {
    return this.fantasy24Service.getFantasy24();
  }

  @Get(':id')
  async getFantasy24ById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Fantasy24 not Found', 404);
    const findFantasy24 = await this.fantasy24Service.getFantasy24ById(id);
    if (!findFantasy24) throw new HttpException('Fantasy24 not Found', 404);
    return findFantasy24;
  }
}
