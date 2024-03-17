import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { GoalController } from './goal.controller';
import { GoalService } from './goal.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Goal, GoalSchema } from './goal.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Goal.name,
        schema: GoalSchema,
      },
    ]),
    AuthModule,
  ],
  controllers: [GoalController],
  providers: [GoalService],
  exports: [GoalService],
})
export class GoalModule {}
