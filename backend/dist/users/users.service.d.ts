import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    create(user: Partial<User>): Promise<{
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
    findAll(): Promise<{
        internalCode?: number;
        code: number;
        data: any;
        message: string;
    }>;
    findOne(id: number): Promise<User | undefined>;
    findOneByUsername(username: string): Promise<User | undefined>;
    update(id: number, user: Partial<User>): Promise<User | undefined>;
    remove(id: number): Promise<void>;
}
