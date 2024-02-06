"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcryptjs");
const http_status_codes_1 = require("http-status-codes");
const common_2 = require("../constants/common");
const users_service_1 = require("../users/users.service");
let AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async register(user) {
        try {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            user.password = hashedPassword;
            if (user) {
                const result = await this.userService.create(user);
                if (result?.code === http_status_codes_1.StatusCodes.OK)
                    return {
                        code: http_status_codes_1.StatusCodes.OK,
                        data: {},
                        message: common_2.RES_MESSAGE.SUCCESS,
                    };
            }
            return {
                code: http_status_codes_1.StatusCodes.BAD_REQUEST,
                internalCode: http_status_codes_1.StatusCodes.BAD_REQUEST,
                data: {},
                message: common_2.RES_MESSAGE.FAILURE,
            };
        }
        catch (error) {
            return {
                code: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
                data: {},
                message: common_2.RES_MESSAGE.FAILURE,
            };
        }
    }
    async validateUser(username, password) {
        const user = await this.userService.findOneByUsername(username);
        if (user && (await bcrypt.compare(password, user.password))) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
    async login(user) {
        try {
            if (user) {
                const payload = { username: user.username, sub: user.id };
                const accessToken = await this.jwtService.sign(payload);
                const updateUser = await this.userService.update(user.id, {
                    accessToken,
                });
                if (updateUser) {
                    return {
                        code: http_status_codes_1.StatusCodes.OK,
                        data: {
                            ...user,
                            accessToken,
                        },
                        message: common_2.RES_MESSAGE.SUCCESS,
                    };
                }
            }
            return {
                code: http_status_codes_1.StatusCodes.BAD_REQUEST,
                internalCode: http_status_codes_1.StatusCodes.BAD_REQUEST,
                data: {},
                message: common_2.RES_MESSAGE.FAILURE,
            };
        }
        catch (error) {
            return {
                code: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
                data: {},
                message: common_2.RES_MESSAGE.FAILURE,
            };
        }
    }
    async findUserByToken(accessToken) {
        try {
            if (accessToken) {
                const verifyToken = this.jwtService.verify(accessToken);
                console.log('verifyToken', verifyToken);
                if (verifyToken) {
                    const user = await this.userService.findUserByToken(accessToken);
                    console.log('user', user);
                    if (user)
                        return {
                            code: http_status_codes_1.StatusCodes.OK,
                            data: {
                                accessToken: user?.data.accessToken,
                                refreshToken: user?.data.refreshToken,
                            },
                            message: common_2.RES_MESSAGE.SUCCESS,
                        };
                }
            }
            return {
                code: http_status_codes_1.StatusCodes.BAD_REQUEST,
                internalCode: http_status_codes_1.StatusCodes.BAD_REQUEST,
                data: {},
                message: common_2.RES_MESSAGE.FAILURE,
            };
        }
        catch (error) {
            return {
                code: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
                data: {},
                message: common_2.RES_MESSAGE.FAILURE,
            };
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map