import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IndividualFantasy23 } from 'src/schema/Fantasy23.schema';
import { IndividualFantasy24 } from 'src/schema/Fantasy24.schema';
import { User } from 'src/schema/User.schema';
// import { CreateIndividualFantasyDto } from './dto/create-fantasy-23.dto';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    @InjectModel(IndividualFantasy24.name)
    private fantasy24Model: Model<IndividualFantasy23>,
    @InjectModel(IndividualFantasy23.name)
    private fantasy23Model: Model<IndividualFantasy24>,
  ) {}

  async getPaymentInfo() {
    const usernames = await this.userModel
      .find({ isFantasyPlayer: true }, { username: 1, _id: 0 })
      .lean();

    const fantasyPlayers = await Promise.all(
      usernames.map(async (player) => {
        const fantasy23 = await this.fantasy23Model
          .findOne({ username: player.username }, { paid: 1, _id: 0 })
          .lean();

        const fantasy24 = await this.fantasy24Model
          .findOne({ username: player.username }, { paid: 1, _id: 0 })
          .lean();

        return {
          fantasy_23: fantasy23 ? fantasy23.paid : null,
          fantasy_24: fantasy24 ? fantasy24.paid : null,
          username: player.username,
          bePaid:
            fantasy23 && fantasy24
              ? 370
              : fantasy23
                ? 170
                : fantasy24
                  ? 200
                  : 0,
          paid:
            fantasy23 && fantasy23.paid && fantasy24 && fantasy24.paid
              ? 370
              : fantasy23 && fantasy23.paid
                ? 170
                : fantasy24 && fantasy24.paid
                  ? 200
                  : 0,
        };
      }),
    );

    return fantasyPlayers;
  }

  getVerified() {}
}
