import { BaseModel } from './base.entity';
export declare class User extends BaseModel {
    id: number;
    username: string;
    email: string;
    password: string;
    accessToken: string;
    refreshToken: string;
    role: string;
    status: string;
}
