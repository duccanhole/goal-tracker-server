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
import { ApiResponse } from '@nestjs/swagger';
import { ICreateResponse, ILoginResponse, IUpdateResponse } from './user.interface';
import { GoogleUserDto } from './dto/google-user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  // @UseGuards(JwtAuthGuard)
  async getUser(@Req() req: any) {
    console.log(req.user);
    return await this.userService.getUser();
  }

  @Post('create')
  @ApiResponse({
    type: ICreateResponse,
  })
  async registerUser(@Body() userData: UserDto) {
    return await this.userService.createUser(userData);
  }

  @Post('login')
  @ApiResponse({
    type: ILoginResponse,
  })
  async login(@Body() userData: UserDto) {
    return await this.userService.login(userData);
  }

  @Post('google-login')
  @ApiResponse({
    type: ILoginResponse
  })
  async googleLogin(@Body() googleUser: GoogleUserDto){
    return await this.userService.googleLogin(googleUser)
  }

  @Put('change-password')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    type: IUpdateResponse,
  })
  async changePassword(@Body() passwordForm: ChangePasswordDto) {
    return await this.userService.updatePassword(passwordForm);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteUser(@Param('id') userId: string) {
    return await this.userService.deleteUser(userId);
  }
}
