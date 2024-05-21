import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './user.model';
import { Inject, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserInput } from './input/user.input';
import { JwtService } from '@nestjs/jwt';
import { Token } from 'src/users/types';
import * as Cookies from 'js-cookie';
import { CurrentUser } from './decorators/current-user.decorator';
import { AuthenticatedAndVerifiedGuard } from 'src/utils/guards/authenticated-and-verified.guard';

@Resolver(() => User)
export class UserResolver {
  constructor(
    @Inject(UserService) private userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Mutation(() => Token)
  async signup(
    @Args({ name: 'userInput', type: () => UserInput }) userInput: UserInput,
    //@Args('lastName') lastName: string,
  ): Promise<Token> {
    const user = await this.userService.signup(userInput);
    if (user) {
      const payload = { sub: user._id, username: user.lastName };
      const accessToken = await this.jwtService.signAsync(payload);
      Cookies.set('accessToken', accessToken, {
        expires: 1 / 24, //in 1 hour
        secure: true,
      });

      return { accessToken };
    }
  }

  @Mutation(() => Token)
  async login(
    @Args({ name: 'userInput', type: () => UserInput }) userInput: UserInput,
  ): Promise<Token> {
    const user = await this.userService.checkPassword(userInput);
    if (user) {
      const payload = { sub: user._id, username: user.lastName };
      const accessToken = await this.jwtService.signAsync(payload);
      return { accessToken };
    }
  }

  @Mutation(() => User)
  async updateUser(
    @Args('userId') userId: string,
    @Args({ name: 'userInput', type: () => UserInput }) userInput: UserInput,
  ): Promise<User> {
    const user = await this.userService.updateUser(userId, userInput);
    return user;
  }

  @Query(() => [User])
  async getUsers(): Promise<User> {
    const user = await this.userService.getUsers();
    return user;
  }

  @UseGuards(AuthenticatedAndVerifiedGuard)
  @Query(() => User)
  async getUser(@CurrentUser() user: User): Promise<User> {
    return await this.userService.getUser(user._id);
  }
}
