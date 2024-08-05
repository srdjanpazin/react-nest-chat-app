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

  async getMessages(
    chatId: number,
    /*, timestamp: number*/
  ): Promise<Message[]> {
    return this.messageModel
      .find({ chatId })
      .sort({ createdAt: 1 })
      .limit(this.msgRetrievalLimit);
    // .find({ chatId, createdAt: { $lt: new Date(timestamp) } })
  }

  async addMessage(newMessage: MessageInput): Promise<Message> {
    const dataToSave = {
      chatId: newMessage.chatId,
      senderId: newMessage.senderId,
      content: newMessage.content,
      createdAt: Date.now(),
    };

    const createdMessage = new this.messageModel(dataToSave);
    return createdMessage.save();
  }
}
