import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FantasyService } from './fantasy.service';
import { FantasyController } from './fantasy.controller';
import { Fantasy, FantasySchema } from 'src/schema/Fantasy.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Fantasy.name,
        schema: FantasySchema,
      },
    ]),
  ],
  providers: [FantasyService],
  controllers: [FantasyController],
})
export class FantasyModule {}
