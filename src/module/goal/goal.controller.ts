import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.guards';
import { GoalService } from './goal.service';
import { GoalDto } from './dto/goal.dto';

@Controller('goal')
@UseGuards(JwtAuthGuard)
export class GoalController {
  constructor(private goalService: GoalService) {}
  @Get('today')
  async getGoalToday(@Req() request) {
    const userId = request.user._id
    return await this.goalService.getGoalToday(userId)
  }

  @Post('/create')
  async createGoal(@Body() body: GoalDto, @Req() request) {
    const userId = request.user._id
    return await this.goalService.create(body, userId)
  }

  @Put('/update')
  async updateGoal(@Body() body: GoalDto, @Req() request) {
    const userId = request.user._id
    return await this.goalService.update(body, userId)
  }

  @Delete(':id')
  async deleteGoal(@Param('id') id: string) {
    return await this.goalService.delete(id)
  }

  @Post('/link-user')
  linkUser() {}

  @Get('/search')
  searchGoal() {}
}
