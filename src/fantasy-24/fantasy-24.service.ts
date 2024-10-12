import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IndividualFantasy24 } from 'src/schema/Fantasy24.schema';
import { CreateIndividualFantasyDto } from './dto/create-fantasy-24.dto';

@Injectable()
export class Fantasy24Service {
  constructor(
    @InjectModel(IndividualFantasy24.name)
    private fantasy24Model: Model<IndividualFantasy24>,
  ) {}

  createFantasy24(createFantasy24Dto: CreateIndividualFantasyDto) {
    const newFantasy24 = new this.fantasy24Model(createFantasy24Dto);
    return newFantasy24.save();
  }

  getFantasy24() {
    return this.fantasy24Model.find();
  }

  getFantasy24ById(id: string) {
    return this.fantasy24Model.findById(id);
  }

  async getFantasy24Sorted(
    sortBy: 'lastMd' | 'longJump' | string,
    order: 'asc' | 'desc' = 'desc',
    limit: number | undefined,
  ) {
    const pipeline: any[] = [];
    const sortOption = {};
    sortOption[sortBy] = order === 'asc' ? 1 : -1;

    if (sortBy === 'lastMd' || sortBy === 'longJump') {
      if (sortBy === 'lastMd') {
        pipeline.push({
          $addFields: {
            lastMdValue: {
              $arrayElemAt: [
                {
                  $filter: {
                    input: { $reverseArray: '$matchdays' },
                    as: 'md',
                    cond: { $gt: ['$$md', 0] },
                  },
                },
                0,
              ],
            },
          },
        });

        pipeline.push({
          $sort: {
            lastMdValue: order === 'asc' ? 1 : -1,
          },
        });
      } else if (sortBy === 'longJump') {
        pipeline.push({
          $addFields: {
            rankJump: { $subtract: ['$prevRank', '$currentRank'] },
          },
        });

        pipeline.push({
          $sort: {
            rankJump: order === 'asc' ? 1 : -1,
          },
        });
      } else {
        pipeline.push({
          $sort: {
            [sortBy]: order === 'asc' ? 1 : -1,
          },
        });
      }

      if (limit) {
        pipeline.push({
          $limit: limit,
        });
      }

      if (pipeline.length === 0) {
        throw new Error('No valid sorting criteria provided.');
      }

      return this.fantasy24Model.aggregate(pipeline).exec();
    }
    return this.fantasy24Model.find().sort(sortOption).limit(limit);
  }

  async updateFantasy24(id: string, updateData: Partial<IndividualFantasy24>) {
    return this.fantasy24Model.findByIdAndUpdate(id, updateData, { new: true });
  }

  async updateSpecificMatchdayPoint(
    id: string,
    matchdayIndex: number,
    points: number,
  ) {
    const fantasy = await this.fantasy24Model.findById(id);
    if (!fantasy) {
      throw new NotFoundException(`Fantasy24 with id ${id} not found`);
    }

    if (matchdayIndex < 0 || matchdayIndex >= fantasy.matchdays.length) {
      throw new Error(`Invalid matchday index: ${matchdayIndex}`);
    }

    fantasy.matchdays[matchdayIndex - 1] = points;

    fantasy.totalPoint = fantasy.matchdays.reduce(
      (sum, point) => sum + point,
      0,
    );

    return fantasy.save();
  }

  async updateUserRank(id: string, newRank: number) {
    const user = await this.fantasy24Model.findById(id);

    if (!user) {
      throw new Error('User not found');
    }

    user.prevRank = user.currentRank;
    user.currentRank = newRank;

    await user.save();

    return user;
  }

  async updateMultipleUserRanks(
    usersToUpdate: { id: string; currentRank: number }[],
  ) {
    console.log(usersToUpdate);

    const updatedUsers = await Promise.all(
      usersToUpdate.map(async (userData) => {
        return this.updateUserRank(userData.id, userData.currentRank);
      }),
    );

    return updatedUsers;
  }

  async batchUpdate(
    updates: Array<{ id: string; updateData: Partial<IndividualFantasy24> }>,
  ) {
    const updatePromises = updates.map((update) =>
      this.fantasy24Model.findByIdAndUpdate(update.id, update.updateData, {
        new: true,
      }),
    );

    return Promise.all(updatePromises);
  }
}
