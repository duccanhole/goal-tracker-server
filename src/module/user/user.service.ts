import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { UserDto } from './dto/user.dto';
import { AuthService } from '../auth/auth.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { GoogleUserDto } from './dto/google-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private authService: AuthService,
  ) {}

  async getUser() {
    return await this.userModel.find();
  }

  async createUser(userData: UserDto) {
    const user = await this.userModel.find({
      username: userData.username,
    });
    if (user.length > 0) throw new ConflictException('User is existed');
    const hashPassword = await bcrypt.hash(userData.password, 10);
    return await this.userModel.create({
      username: userData.username,
      password: hashPassword,
      email: userData.email
    });
  }

  async login(userData: UserDto) {
    let check = true;
    const user = await this.userModel.findOne({ username: userData.username });
    if (!user) check = false;
    check = await bcrypt.compare(userData.password, user.password);
    if (!check) throw new BadRequestException('Wrong username or password');
    const token = await this.authService.generateToken(user.toObject());
    return {
      token,
      userData: user
    };
  }

  async googleLogin(googleUser: GoogleUserDto){
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!regex.test(googleUser.email)) throw new BadRequestException("Email invalid")
    const user = await this.userModel.findOne({ email: googleUser.email })
    let username = googleUser.displayName
    if(!user) {
      const checkExisted = await this.userModel.findOne({ username: googleUser.displayName })
      const randomNumber = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000
      username = checkExisted ? googleUser.displayName + randomNumber : googleUser.displayName
      await this.createUser({
        username,
        password: googleUser.uid,
        email: googleUser.email
      })
    }
    else {
      username = user.username
    }
    return await this.login({
      username,
      password: googleUser.uid
    })
  }

  async updatePassword(data: ChangePasswordDto) {
    let check = true;
    const user = await this.userModel.findOne({ _id: data.userId });
    if (!user) check = false;
    check = await bcrypt.compare(data.oldPassword, user.password);
    if (!check) throw new BadRequestException('Wrong username or password');
    const hashPassword = await bcrypt.hash(data.newPassword, 10);
    await this.userModel.findByIdAndUpdate(data.userId, {
      password: hashPassword,
    });
    return 'done';
  }

  async deleteUser(userId: string) {
    await this.userModel.deleteOne({
      _id: userId,
    });
    return 'done';
  }
}
