import { Prop, Schema } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { type } from 'os';
import { User } from '../user/user.schema';

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

  @Prop({ type: Date })
  notifyAt: Date;

  @Prop({ required: true, type: Date })
  createdAt: Date;
}
