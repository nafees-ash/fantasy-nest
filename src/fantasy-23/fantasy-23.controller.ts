import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
} from '@nestjs/common';
import { Fantasy23Service } from './fantasy-23.service';
import { CreateIndividualFantasyDto } from './dto/create-fantasy-23.dto';
import mongoose from 'mongoose';

@Controller('fantasy/23')
export class Fantasy23Controller {
  constructor(private fantasy23Service: Fantasy23Service) {}

  @Post()
  createFantasy23(@Body() createFantasy23Dto: CreateIndividualFantasyDto) {
    console.log(createFantasy23Dto);
    return this.fantasy23Service.createFantasy23(createFantasy23Dto);
  }

  @Get()
  getFantasy23() {
    return this.fantasy23Service.getFantasy23();
  }

  @Get(':id')
  async getFantasy23ById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Fantasy23 not Found', 404);
    const findFantasy23 = await this.fantasy23Service.getFantasy23ById(id);
    if (!findFantasy23) throw new HttpException('Fantasy23 not Found', 404);
    return findFantasy23;
  }
}
