import { BaseModel } from "./base.entity";
export declare class User extends BaseModel {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    phone: string;
    email: string;
    password: string;
    accessToken: string;
    refreshToken: string;
    status: string;
}
