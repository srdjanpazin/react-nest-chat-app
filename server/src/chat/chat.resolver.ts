import { Args, Query, Resolver } from '@nestjs/graphql';
import { ChatService } from './chat.service';

@Resolver('Chat')
export class ChatResolver {
  constructor(private chatService: ChatService) {}

  @Query('chats')
  async getChatsForUser(@Args('userId') userId: string) {
    return await this.chatService.getChatsForUser(userId);
  }
}
