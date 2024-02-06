import { User } from "../entities/user.entity";
import { UsersService } from "../users/users.service";
import { AuthService } from "./auth.service";
export declare class AuthController {
    private readonly authService;
    private readonly userService;
    constructor(authService: AuthService, userService: UsersService);
    register(user: Partial<User>, res: any): Promise<void>;
    login(username: string, password: string, res: any): Promise<void>;
    getUserByToken(accessToken: string, res: any): Promise<void>;
}
