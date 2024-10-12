import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  IndividualFantasy23,
  IndividualFantasySchema23,
} from 'src/schema/Fantasy23.schema';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { User, UserSchema } from 'src/schema/User.schema';
import {
  IndividualFantasy24,
  IndividualFantasySchema24,
} from 'src/schema/Fantasy24.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: IndividualFantasy23.name,
        schema: IndividualFantasySchema23,
      },
      {
        name: IndividualFantasy24.name,
        schema: IndividualFantasySchema24,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  providers: [PaymentService],
  controllers: [PaymentController],
  exports: [MongooseModule],
})
export class PaymentModule {}
