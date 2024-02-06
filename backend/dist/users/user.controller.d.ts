import { UsersService } from './users.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UsersService);
    getAll(): Promise<{
        internalCode?: number;
        code: number;
        data: any;
        message: string;
    }>;
}
