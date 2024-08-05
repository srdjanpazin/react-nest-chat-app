import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Message {
  @Prop()
  chatId: number;

  @Prop()
  senderId: string;

  @Prop()
  content: string;

  @Prop()
  createdAt: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
