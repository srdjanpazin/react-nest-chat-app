import { Injectable } from '@nestjs/common';
import { Chat } from './chat.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class ChatService {
  constructor(@InjectModel(Chat.name) private chatModel: Model<Chat>) {}

  async getChatsForUser(userId: string): Promise<Chat[]> {
    const data = await this.chatModel
      .find({ participants: { $in: [new Types.ObjectId(userId)] } }, { _id: 0 })
      .sort({ createdAt: 1 })
      .populate('participants'); // FIXME: Population not working

    return data;
  }
}
