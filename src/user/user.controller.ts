import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './user.dtc';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('/list')
  getUserList(): string {
    return this.userService.getUserList();
  }

  @Post('/create')
  createUser(@Body() user: CreateUserDto): CreateUserDto {
    return this.userService.createUser(user);
  }
}
