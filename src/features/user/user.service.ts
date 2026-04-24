import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './user.dtc';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UserService {
  private readonly filePath = path.join(__dirname, 'user.json');

  getUserList(): CreateUserDto[] {
    const raw = fs.readFileSync(this.filePath, 'utf-8');
    return JSON.parse(raw) as CreateUserDto[];
  }

  createUser(user: CreateUserDto): CreateUserDto {
    const list = this.getUserList();

    if (list.some((u) => u.username === user.username)) {
      throw new ConflictException(`用户名 ${user.username} 已存在`);
    }

    const nextId =
      list.length === 0 ? 1 : Math.max(...list.map((u) => u.id ?? 0)) + 1;

    const newUser: CreateUserDto = {
      id: nextId,
      username: user.username,
      password: user.password,
    };

    list.push(newUser);
    this.writeUserList(list);

    return newUser;
  }

  updateUser(user: CreateUserDto): CreateUserDto {
    return user;
  }

  private writeUserList(list: CreateUserDto[]): void {
    fs.writeFileSync(this.filePath, JSON.stringify(list, null, 2), 'utf-8');
  }
}
