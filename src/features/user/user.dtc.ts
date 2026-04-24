// src/features/user/user.dtc.ts
import {
  IsString,
  IsNotEmpty,
  Length,
  Matches,
  IsOptional,
  IsInt,
} from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  @IsInt({ message: 'id 必须是整数' })
  id?: number;

  @IsString({ message: 'username 必须是字符串' })
  @IsNotEmpty({ message: 'username 不能为空' })
  @Length(3, 20, { message: 'username 长度需在 3-20 之间' })
  @Matches(/^[a-zA-Z0-9_]+$/, { message: 'username 只能包含字母、数字、下划线' })
  username: string;

  @IsString()
  @IsNotEmpty({ message: 'password 不能为空' })
  @Length(6, 32, { message: 'password 长度需在 6-32 之间' })
  // 至少包含一个字母和一个数字
  @Matches(/^(?=.*[A-Za-z])(?=.*\d).+$/, {
    message: 'password 必须同时包含字母和数字',
  })
  password: string;
}