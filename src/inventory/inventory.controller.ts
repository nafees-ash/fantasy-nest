import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
} from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import mongoose from 'mongoose';

@Controller('inventory')
export class InventoryController {
  constructor(private inventoryService: InventoryService) {}

  @Post()
  createInventory(@Body() createInventoryDto: CreateInventoryDto) {
    console.log(createInventoryDto);
    return this.inventoryService.createInventory(createInventoryDto);
  }

  @Get()
  getInventorys() {
    return this.inventoryService.getInventorys();
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
