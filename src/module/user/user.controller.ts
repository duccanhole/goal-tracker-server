import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getUser() {
    return await this.userService.getUser();
  }

  @Post('create')
  async registerUser(@Body() userData: UserDto) {
    return await this.userService.createUser(userData);
  }

  @Post('login')
  async login(@Body() userData: UserDto) {
    return await this.userService.login(userData);
  }

  @Put('change-password')
  async changePassword(@Body() passwordForm: ChangePasswordDto) {
    return await this.userService.updatePassword(passwordForm);
  }

  @Delete(':id')
  async deleteUser(@Param('id') userId: string) {
    return await this.userService.deleteUser(userId);
  }
}
