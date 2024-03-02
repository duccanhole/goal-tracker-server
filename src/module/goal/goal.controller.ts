import { Controller, Delete, Get, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.guards';

@Controller('goal')
@UseGuards(JwtAuthGuard)
export class GoalController {
  @Get()
  getGoal() {}

  @Post('/create')
  createGoal() {}

  @Put('/update')
  updateGoal() {}

  @Delete(':id')
  deleteGoal() {}

  @Post('/link-user')
  linkUser() {}

  @Get('/search')
  searchGoal() {}
}
