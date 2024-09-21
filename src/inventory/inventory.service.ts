import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Inventory } from 'src/schema/Inventory.schema';
import { CreateInventoryDto } from './dto/create-inventory.dto';

@Injectable()
export class InventoryService {
  constructor(
    @InjectModel(Inventory.name) private inventoryModel: Model<Inventory>,
  ) {}

  createInventory(createInventoryDto: CreateInventoryDto) {
    const newInventory = new this.inventoryModel(createInventoryDto);
    return newInventory.save();
  }

  getInventorys() {
    return this.inventoryModel.find();
  }

  getFund() {
    return this.inventoryModel.findOne({ type: 'fund' });
  }

  getInventoryById(id: string) {
    return this.inventoryModel.findById(id);
  }

  async updateFund(value: number) {
    const fund = await this.inventoryModel.findOne({ type: 'fund' });

    if (!fund) {
      throw new Error('Fund not found');
    }

    fund.value = value;

    await fund.save();

    return fund;
  }
}
