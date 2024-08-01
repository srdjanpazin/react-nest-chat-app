import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from './message.schema';
import { Model } from 'mongoose';
import { MessageInput } from './message.input';

@Injectable()
export class MessagesService {
  private msgRetrievalLimit = 20;

  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>,
  ) {}

  async getMessages(chatId: number, timestamp: number): Promise<Message[]> {
    return this.messageModel
      .find({ chatId, createdAt: { $lt: new Date(timestamp) } })
      .sort({ createdAt: -1 })
      .limit(this.msgRetrievalLimit);
  }

  async addMessage(newMessage: MessageInput): Promise<Message> {
    const createdMessage = new this.messageModel(newMessage);
    return createdMessage.save();
  }
}
