import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Message {

  @Prop()
  chatId: number;

  @Prop()
  senderId: number;

  @Prop()
  content: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
