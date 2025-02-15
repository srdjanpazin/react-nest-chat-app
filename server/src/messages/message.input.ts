import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class MessageInput {
  @Field()
  chatId: number;

  @Field()
  senderId: string;

  @Field()
  content: string;
}
