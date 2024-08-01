import { MinLength, MaxLength } from 'class-validator';
import { Message } from '../graphql.ts';

export class CreateMessageInput extends Message {
  @MinLength(1)
  @MaxLength(5000)
  content: string;
}
