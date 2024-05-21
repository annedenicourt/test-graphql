import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from './user.model';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
//import { JwtService } from '@nestjs/jwt';
//import { UserInput } from './input/user.input';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel,
  ) {}

  async signup(input) {
    const { firstName, lastName, email, password } = input;
    const isExistedEmail = await this.userModel.findOne({ email });
    if (isExistedEmail)
      throw new BadRequestException('Un compte avec cet email existe déjà');

    const user = await this.userModel.create({
      firstName,
      lastName,
      email,
      password: await this.encryptPassword(password),
    });
    return user;
  }

  async checkPassword(input) {
    const { email, password } = input;

    const user = await this.getUserByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const isGoodPassword = await this.comparePassword(user, password);
    if (!isGoodPassword) {
      throw new UnauthorizedException('Password does not match');
    }
    return user;
  }

  /* async generateTokens(user: UserInput) {
    const payload = { username: user.lastName, sub: user._id };
    const access_token = await JwtService.signAsync(payload);
    return { access_token };
  } */

  async encryptPassword(password) {
    const passwordEncrypted = await bcrypt.hash(password, 10);
    return passwordEncrypted;
  }

  async comparePassword(user, password) {
    const passwordMatch = await bcrypt.compare(password, user.password);
    return passwordMatch;
  }

  async updateUser(userId, input) {
    const { roles } = input;
    const userUpdates: any = {};
    if (roles) userUpdates.roles = roles;
    //const user = await this.userModel.findOne({ _id: userId });
    const user = await this.userModel.findOneAndUpdate(
      { _id: userId },
      { $set: userUpdates },
    );

    return user;
  }

  /* async asignRoleToUser(userId: any, newRole: string) {
    const updated = await this.userModel
      .findOne({ _id: userId })
      .then(async (account: { roles: string[] }) => {
        if (!account.roles.includes(newRole)) {
          return await this.userModel.updateOne(
            { _id: userId },
            { $push: { roles: newRole } },
          );
        }
      });
    return updated;
  } */

  async getUsers() {
    const allUsers = await this.userModel.find({});
    return allUsers;
  }

  async getUser(userId) {
    const currentUser = await this.userModel.findOne({ _id: userId });
    return currentUser;
  }

  async getUserByEmail(email) {
    const user = await this.userModel.findOne({ email });
    return user;
  }
}
