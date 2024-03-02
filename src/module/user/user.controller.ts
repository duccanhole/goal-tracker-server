import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guards';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUser(@Req() req: any) {
    console.log(req.user);
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
  @UseGuards(JwtAuthGuard)
  async changePassword(@Body() passwordForm: ChangePasswordDto) {
    return await this.userService.updatePassword(passwordForm);
  }

  @Delete(':id')
  async deleteUser(@Param('id') userId: string) {
    return await this.userService.deleteUser(userId);
  }
}
