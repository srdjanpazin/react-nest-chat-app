import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { PUB_SUB } from 'src/constants';
import { MessagesService } from './messages.service';
import { MessageInput } from './message.input';

@Resolver('Message')
export class MessagesResolver {
  constructor(
    private messageService: MessagesService,
    @Inject(PUB_SUB) private pubSub: PubSub,
  ) {}

  @Query('messages')
  async getMessages(
    @Args('chatId') chatId: number,
    @Args('timestamp') timestamp: number,
  ) {
    return await this.messageService.getMessages(chatId, timestamp);
  }

  @Mutation()
  async addMessage(@Args('messageData') messageData: MessageInput) {
    const newMessage = this.messageService.addMessage(messageData);
    this.pubSub.publish('messageAdded', { messageAdded: newMessage });
    return newMessage;
  }

  @Subscription('messageAdded')
  subscribeToMessageAdded() {
    return this.pubSub.asyncIterator('messageAdded');
  }
}
