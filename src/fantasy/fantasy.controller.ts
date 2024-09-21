import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
} from '@nestjs/common';
import { FantasyService } from './fantasy.service';
import { CreateFantasyDto } from './dto/create-fantasy.dto';
import mongoose from 'mongoose';

@Controller('fantasy')
export class FantasyController {
  constructor(private fantasyService: FantasyService) {}

  @Post()
  createUser(@Body() createFantasyDto: CreateFantasyDto) {
    console.log(createFantasyDto);
    return this.fantasyService.createFantasy(createFantasyDto);
  }

  @Get()
  getFantasy() {
    return this.fantasyService.getFantasy();
  }

  @Get(':id')
  async getFantasy24ById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Fantasy24 not Found', 404);
    const findFantasy24 = await this.fantasyService.getFantasyById(id);
    if (!findFantasy24) throw new HttpException('Fantasy24 not Found', 404);
    return findFantasy24;
  }
}
