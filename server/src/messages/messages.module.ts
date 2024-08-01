import { Module } from '@nestjs/common';
import { MessagesResolver } from './messages.resolver';
import { AppModule } from 'src/app.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './message.schema';
import { MessagesService } from './messages.service';

@Module({
  imports: [
    AppModule,
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
  ],
  providers: [MessagesService, MessagesResolver],
})
export class MessagesModule {}
