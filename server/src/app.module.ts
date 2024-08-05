import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
// import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CorsMiddleware } from './cors.middleware';
// import { ChatService } from './chat/chat.service';
import { ChatModule } from './chat/chat.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: [join(process.cwd(), 'src/schema.graphql')],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
        outputAs: 'class',
      },
      subscriptions: {
        'graphql-ws': true,
      },
    }),

    MongooseModule.forRoot('mongodb://127.0.0.1:27017/reactNestChatApp'),

    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'client', 'build'),
    // }),

    MessagesModule,
    AuthModule,
    UsersModule,
    ChatModule,
  ],

  controllers: [AppController],

  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleware).forRoutes('*');
  }
}
