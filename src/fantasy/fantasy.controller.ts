import { Body, Controller, Get, Post } from '@nestjs/common';
import { FantasyService } from './fantasy.service';
import { CreateFantasyDto } from './dto/create-fantasy.dto';

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
}
