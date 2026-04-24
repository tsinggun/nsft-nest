import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './user.dtc';
import * as fs from 'fs';
import * as path from 'path';
@Injectable()
export class UserService {
  getUserList(): CreateUserDto[] {
    const filePath = path.join(__dirname, 'user.json');
    const user = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(user) as CreateUserDto[];
  }

  createUser(user: CreateUserDto): CreateUserDto {
    return user;
  }

  updateUser(user: CreateUserDto): CreateUserDto {
    return user;
  }
}
