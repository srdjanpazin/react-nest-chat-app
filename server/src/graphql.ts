
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class MessageInput {
    chatId: number;
    senderId: string;
    content: string;
}

export class User {
    _id: string;
    name?: Nullable<string>;
}

export class Message {
    id: number;
    chatId: number;
    senderId: string;
    createdAt: string;
    content: string;
}

export class Chat {
    uuid?: Nullable<number>;
    participants: User[];
    name?: Nullable<string>;
    lastMsg?: Nullable<string>;
    lastMsgTime: number;
}

export abstract class IQuery {
    abstract messages(chatId: number): Nullable<Nullable<Message>[]> | Promise<Nullable<Nullable<Message>[]>>;

    abstract chats(userId: string): Nullable<Nullable<Chat>[]> | Promise<Nullable<Nullable<Chat>[]>>;
}

export abstract class IMutation {
    abstract postMessage(messageData: MessageInput): Nullable<Message> | Promise<Nullable<Message>>;
}

export abstract class ISubscription {
    abstract messageAdded(): Nullable<Message> | Promise<Nullable<Message>>;
}

type Nullable<T> = T | null;
