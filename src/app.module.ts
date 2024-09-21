import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FantasyModule } from './fantasy/fantasy.module';
import { InventoryModule } from './inventory/inventory.module';
import { Fantasy23Module } from './fantasy-23/fantasy-23.module';
import { Fantasy24Module } from './fantasy-24/fantasy-24.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URL'),
        dbName: configService.get<string>('DATABASE_NAME'),
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    FantasyModule,
    InventoryModule,
    Fantasy23Module,
    Fantasy24Module,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
