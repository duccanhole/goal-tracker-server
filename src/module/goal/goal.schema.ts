import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { type } from 'os';
import { User } from '../user/user.schema';

export type GoalDocument = Goal & Document;

@Schema()
export class Goal {
  @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
  user: string;

  @Prop({ required: true, type: String })
  name: string;

  @Prop({ type: Boolean, default: false })
  isDone: boolean;

  @Prop({ type: Boolean, default: false })
  hasNotification: boolean;

  @Prop({ type: String })
  notifyAt: String;

  @Prop({ required: true, type: Date })
  createdAt: Date;
}

export const GoalSchema = SchemaFactory.createForClass(Goal);