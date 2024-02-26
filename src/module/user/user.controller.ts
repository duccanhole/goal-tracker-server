import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {
  }
  
  @Get()
  async getUser() {
    return await this.userService.getUser()
  }

  @Post('create')
  async registerUser(@Body() userData: UserDto){
    return await this.userService.createUser(userData)
  }

  @Post('login')
  async login(){}

  @Put('change-password')
  async changePassword() {
    
  }
}
