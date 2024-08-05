import { Module } from '@nestjs/common';
import { MessagesResolver } from './messages.resolver';
// import { AppModule } from 'src/app.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './message.schema';
import { MessagesService } from './messages.service';
import { PUB_SUB } from 'src/constants';
import { PubSub } from 'graphql-subscriptions';

@Module({
  imports: [
    // AppModule,
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
  ],
  providers: [
    MessagesService,
    MessagesResolver,
    {
      provide: PUB_SUB,
      useValue: new PubSub(),
    },
  ],
})
export class MessagesModule {}
