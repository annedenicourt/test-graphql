import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.model';
import { JwtModule } from '@nestjs/jwt';
//import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      global: true,
      secret: 'ABCDEFGHIJKL',
      signOptions: { expiresIn: '3600s' },
    }),
    /* JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: '',
        signOptions: { expiresIn: '3600s' },
      }),
    }), */
  ],
  controllers: [],
  providers: [UserService, UserResolver],
})
export class UserModule {}
