import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import mongoose from 'mongoose';
import { UpdateFundDto } from './dto/update-fund.dto';

@Controller('inventory')
export class InventoryController {
  constructor(private inventoryService: InventoryService) {}

  @Post()
  createInventory(@Body() createInventoryDto: CreateInventoryDto) {
    console.log(createInventoryDto);
    return this.inventoryService.createInventory(createInventoryDto);
  }

  @Patch('fund')
  async updateFund(@Body() updateFundDto: UpdateFundDto) {
    try {
      return await this.inventoryService.updateFund(updateFundDto.value);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  getInventorys() {
    return this.inventoryService.getInventorys();
  }

  @Get('fund')
  getFund() {
    return this.inventoryService.getFund();
  }

  @Get(':id')
  async getInventoryById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('inventory not Found', 404);
    const findInventory = await this.inventoryService.getInventoryById(id);
    if (!findInventory) throw new HttpException('inventory not Found', 404);
    return findInventory;
  }
}
