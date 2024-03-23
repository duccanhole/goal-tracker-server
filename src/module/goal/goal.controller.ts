import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.guards';
import { GoalService } from './goal.service';
import { GoalDto } from './dto/goal.dto';
import { ApiResponse } from '@nestjs/swagger';
import { ICreateGetUpdateResponse, IGetTodayResponse } from './goal.interface';
import { log } from 'console';

@Controller('goal')
@UseGuards(JwtAuthGuard)
export class GoalController {
  constructor(private goalService: GoalService) {}
  @Get()
  async get() {
    return await this.goalService.get()
  }

  @Get('today')
  @ApiResponse({
    isArray: true,
    type: IGetTodayResponse
  })
  async getGoalToday(@Req() request) {
    const userId = request.user._id
    return await this.goalService.getGoalToday(userId)
  }

  @Get(':id')
  @ApiResponse({
    type: ICreateGetUpdateResponse
  })
  async getGoalDetail(@Param('id') id: string) {
    return await this.goalService.getGoalDetail(id)
  }

  @Post('/create')
  @ApiResponse({
    type: ICreateGetUpdateResponse
  })
  async createGoal(@Body() body: GoalDto, @Req() request) {
    const userId = request.user._id
    return await this.goalService.create(body, userId)
  }

  @Put(':id')
  @ApiResponse({
    type: ICreateGetUpdateResponse
  })
  async updateGoal(@Param('id') id: string, @Body() body: GoalDto) {
    return await this.goalService.update(id, body)
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
