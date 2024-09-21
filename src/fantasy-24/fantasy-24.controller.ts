import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  Patch,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { Fantasy24Service } from './fantasy-24.service';
import { CreateIndividualFantasyDto } from './dto/create-fantasy-24.dto';
import mongoose from 'mongoose';
import { IndividualFantasy24 } from 'src/schema/Fantasy24.schema';

@Controller('fantasy-24')
export class Fantasy24Controller {
  constructor(private fantasy24Service: Fantasy24Service) {}

  @Post()
  createFantasy24(@Body() createFantasy24Dto: CreateIndividualFantasyDto) {
    console.log(createFantasy24Dto);
    return this.fantasy24Service.createFantasy24(createFantasy24Dto);
  }

  @Get()
  getFantasy24(
    @Query('sortBy') sortBy: string,
    @Query('order') order: 'asc' | 'desc',
    @Query('limit') limit: number,
  ) {
    if (sortBy) {
      return this.fantasy24Service.getFantasy24Sorted(sortBy, order, limit);
    }
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

  @Patch(':id')
  async updateFantasy24(
    @Param('id') id: string,
    @Body() updateData: Partial<IndividualFantasy24>,
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid Fantasy24 ID', 400);
    const updatedFantasy24 = await this.fantasy24Service.updateFantasy24(
      id,
      updateData,
    );
    if (!updatedFantasy24) throw new HttpException('Fantasy24 not Found', 404);
    return updatedFantasy24;
  }

  @Patch(':id/matchday/:matchdayIndex')
  async updateSpecificMatchdayPoint(
    @Param('id') id: string,
    @Param('matchdayIndex') matchdayIndex: string,
    @Body('points') points: number,
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid Fantasy24 ID', 400);

    const index = parseInt(matchdayIndex, 10);
    if (isNaN(index)) throw new HttpException('Invalid matchday index', 400);

    try {
      const updatedFantasy24 =
        await this.fantasy24Service.updateSpecificMatchdayPoint(
          id,
          index,
          points,
        );
      return updatedFantasy24;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(error.message, 404);
      }
      throw new HttpException(error.message, 400);
    }
  }

  @Patch(':id/update-rank')
  async updateRank(
    @Param('id') id: string,
    @Body('currentRank') currentRank: number,
  ) {
    return this.fantasy24Service.updateUserRank(id, currentRank);
  }

  @Patch('update-ranks')
  async updateRanks(
    @Body() usersToUpdate: { id: string; currentRank: number }[],
  ) {
    console.log(usersToUpdate);
    return this.fantasy24Service.updateMultipleUserRanks(usersToUpdate);
  }

  @Patch('batch-update')
  async batchUpdate(
    @Body()
    updates: Array<{ id: string; updateData: Partial<IndividualFantasy24> }>,
  ) {
    return this.fantasy24Service.batchUpdate(updates);
  }
}
