import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { MessagesModule } from './messages/messages.module';
import { PubSub } from 'graphql-subscriptions';
import { PUB_SUB } from './constants';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
        outputAs: 'class',
      },
      subscriptions: {
        'graphql-ws': true,
      },
    }),

    MongooseModule.forRoot('mongodb://localhost:27017/reactNestChatApp'),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client', 'build'),
    }),

    MessagesModule,

    AuthModule,

    UsersModule,
  ],

  controllers: [AppController],

  providers: [
    AppService,
    {
      provide: PUB_SUB,
      useValue: new PubSub(),
    },
  ],
})
export class AppModule {}
