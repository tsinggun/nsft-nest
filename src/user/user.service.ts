import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './user.dtc';
@Injectable()
export class UserService {
  getUserList(): string {
    return 'getUserList';
  }

  createUser(user: CreateUserDto): CreateUserDto {
    // return {'password'}
    // console.log(user);
    return user;
  }
}
