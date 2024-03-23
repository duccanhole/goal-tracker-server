import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Goal, GoalDocument } from './goal.schema';
import { Model } from 'mongoose';
import { GoalDto } from './dto/goal.dto';

@Injectable()
export class GoalService {
  constructor(@InjectModel(Goal.name) private goalModel: Model<GoalDocument>) {}

  async getGoalToday(userId: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const startOfDay = new Date(today);
    const endOfDay = new Date(today);
    endOfDay.setDate(endOfDay.getDate() + 1);
    return await this.goalModel.find({
      user: userId,
      createdAt: {
        $gte: startOfDay,
        $lt: endOfDay,
      },
    });
  }

  async getGoalDetail(id: string) {
    const doc = await this.goalModel.findById(id);
    if (!doc) throw new NotFoundException('Data not found');
    return doc
  }

  async create(goalData: GoalDto, byUser: string) {
    const payload = {
      ...goalData,
      user: byUser,
      createdAt: new Date().toISOString(),
    };
    return await this.goalModel.create(payload);
  }

  async update(id: String,goalData: GoalDto) {
    const doc = await this.goalModel.findById(id);
    if (!doc) throw new NotFoundException('Data not found');
    await this.goalModel.findByIdAndUpdate(id, goalData);
    return await this.goalModel.findById(id);
  }

  async delete(id: string) {
    const doc = await this.goalModel.findById(id);
    if (!doc) throw new NotFoundException('Data not found');
    await this.goalModel.findByIdAndDelete(id);
    return 'done';
  }
}
