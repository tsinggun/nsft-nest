import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './user.dtc';
// import { Raw } from '../common/decorators/raw.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('/list')
  getUserList(): string {
    return this.userService.getUserList();
  }

  @Post('/create')
  // @Raw()
  createUser(@Body() user: CreateUserDto): CreateUserDto {
    return this.userService.createUser(user);
  }
}
