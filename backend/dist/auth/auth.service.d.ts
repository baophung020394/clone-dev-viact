import { JwtService } from "@nestjs/jwt";
import { User } from "src/entities/user.entity";
import { UsersService } from "../users/users.service";
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UsersService, jwtService: JwtService);
    register(user: Partial<User>): Promise<{
        internalCode?: number;
        code: number;
        data: any;
        message: string;
    }>;
    validateUser(username: string, password: string): Promise<any>;
    login(user: Partial<User>): Promise<{
        internalCode?: number;
        code: number;
        data: any;
        message: string;
    }>;
    findUserByToken(accessToken: string): Promise<{
        internalCode?: number;
        code: number;
        data: any;
        message: string;
    }>;
}
