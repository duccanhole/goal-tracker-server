import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { UserDto } from './dto/user.dto';
import { AuthService } from '../auth/auth.service';

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
    const user = this.userModel.find({
      username: userData.username,
    });
    if (user) throw new Error('User is existed');
    const hashPassword = await bcrypt.hash(userData.password, 10);
    return await this.userModel.create({
      username: userData.username,
      password: hashPassword,
    });
  }

  async login(userData: UserDto) {
    let check = true;
    const user = await this.userModel.findOne({ username: userData.username });
    if (!user) check = false;
    check = await bcrypt.compare(userData.password, userData.password);
    if (!check) throw new Error('Wrong username or password');
    return await this.authService.generateToken(userData);
  }

  async updatePassword(userData: UserDto) {
    let check = true;
    const user = await this.userModel.findOne({ username: userData.username });
    if (!user) check = false;
    check = await bcrypt.compare(userData.password, userData.password);
    if (!check) throw new Error('Wrong username or password');
    const hashPassword = await bcrypt.hash(userData.password, 10);
    return await this.userModel.updateOne(
      {
        username: userData.username,
      },
      {
        password: hashPassword,
      },
    );
  }
}
