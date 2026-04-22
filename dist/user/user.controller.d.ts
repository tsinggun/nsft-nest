import { UserService } from './user.service';
import { CreateUserDto } from './user.dtc';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUserList(): string;
    createUser(user: CreateUserDto): CreateUserDto;
}
