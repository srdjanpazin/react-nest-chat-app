import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class User {
  @Prop()
  _id: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  // @Prop({ required: true, unique: true })
  // email: string;

  // @Prop({ required: true })
  // password: string;

  // @Prop({ required: true, default: Date.now })
  // createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
