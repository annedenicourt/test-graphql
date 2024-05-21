import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserModule } from './users/user.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        uri: 'mongodb+srv://annedenicourt:gBsQmcQ9FF33C7BN@cluster1.q89sc4x.mongodb.net/', // Retrieve the MongoDB URI from configuration
        dbName: 'myApp',
      }),
      inject: [ConfigService],
    }),
    /* MongooseModule.forRoot(
      'mongodb+srv://annedenicourt:gBsQmcQ9FF33C7BN@cluster1.q89sc4x.mongodb.net/',
    ), */
    GraphQLModule.forRootAsync({
      imports: [ConfigModule],
      driver: ApolloDriver,
      useFactory: async (): Promise<ApolloDriverConfig> => ({
        playground: true, // Enable GraphQL Playground
        introspection: true,
        //context: ({ req }) => ({ req }),
        autoSchemaFile: true,
        context: ({ req, res }) => ({ req, res }),
      }),
      inject: [ConfigService],
    }),
    UserModule,
  ],
  //controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
