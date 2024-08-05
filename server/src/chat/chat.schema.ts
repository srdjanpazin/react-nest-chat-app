import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { User } from 'src/users/user.schema';

@Schema()
export class Chat {
  @Prop({ required: true, type: [{ type: Types.ObjectId, ref: 'User' }] })
  participants: User[];

  @Prop()
  name: string;

  @Prop()
  lastMsg: string;

  @Prop({ required: true })
  lastMsgTime: Date;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
