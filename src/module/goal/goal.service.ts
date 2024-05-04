import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Goal, GoalDocument } from './goal.schema';
import { Model } from 'mongoose';
import { GoalDto } from './dto/goal.dto';

@Injectable()
export class GoalService {
  constructor(@InjectModel(Goal.name) private goalModel: Model<GoalDocument>) {}
  async get() {
    return await this.goalModel.find();
  }

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

  async getByRange(range: number = -1, user: string) {
    const qUndone: any = { isDone: false, user },
      qDone: any = { isDone: true, user };
    if (range > 0) {
      const today = new Date();
      const start = new Date();
      start.setDate(today.getDate() - range)
      const end = new Date();
      end.setDate(today.getDate())
      qDone.createdAt = {
        $gte: start,
        $lt: end,
      };
      qUndone.createdAt = {
        $gte: start,
        $lt: end,
      };
    }
    const undone = await this.goalModel.countDocuments(qUndone);
    const done = await this.goalModel.countDocuments(qDone);
    return { undone, done };
  }

  async getUserLevel(user: string) {
    const totalDone = await this.goalModel.countDocuments({ user });
    switch (true) {
      case totalDone <= 10:
        return 1;
      case totalDone > 10 && totalDone <= 25:
        return 2;
      case totalDone > 25 && totalDone <= 100:
        return 3;
      case totalDone > 100 && totalDone <= 200:
        return 4;
      case totalDone > 200 && totalDone <= 500:
        return 5;
      default:
        return 6;
    }
  }

  async getGoalDetail(id: string) {
    const doc = await this.goalModel.findById(id);
    if (!doc) throw new NotFoundException('Data not found');
    return doc;
  }

  async create(goalData: GoalDto, byUser: string) {
    const payload = {
      ...goalData,
      user: byUser,
      createdAt: new Date().toISOString(),
    };
    return await this.goalModel.create(payload);
  }

  async update(id: String, goalData: GoalDto) {
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
