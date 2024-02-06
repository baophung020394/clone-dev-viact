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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const http_status_codes_1 = require("http-status-codes");
const typeorm_2 = require("typeorm");
const common_2 = require("../constants/common");
const user_entity_1 = require("../entities/user.entity");
let UsersService = class UsersService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async create(user) {
        try {
            const { username, email } = user;
            const existingUser = await this.userRepository.findOne({
                where: [{ username }, { email }],
            });
            if (!existingUser) {
                const result = this.userRepository.save(user);
                if (result)
                    return {
                        code: http_status_codes_1.StatusCodes.OK,
                        data: {},
                        message: common_2.RES_MESSAGE.SUCCESS,
                    };
            }
            return {
                code: http_status_codes_1.StatusCodes.CONFLICT,
                internalCode: 100,
                data: {},
                message: common_2.RES_MESSAGE.USERISEXISTED,
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
                const user = await this.userRepository.findOne({
                    where: [{ accessToken }],
                });
                if (user)
                    return {
                        code: http_status_codes_1.StatusCodes.OK,
                        data: {
                            accessToken: user?.accessToken,
                            refreshToken: user?.refreshToken,
                        },
                        message: common_2.RES_MESSAGE.SUCCESS,
                    };
            }
            return {
                code: http_status_codes_1.StatusCodes.NOT_FOUND,
                internalCode: 404,
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
    async findAll() {
        try {
            const users = await this.userRepository.find();
            if (users)
                return {
                    code: http_status_codes_1.StatusCodes.OK,
                    data: {
                        users,
                    },
                    message: common_2.RES_MESSAGE.SUCCESS,
                };
            return {
                code: http_status_codes_1.StatusCodes.NOT_FOUND,
                internalCode: 404,
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
    async findOne(id) {
        return this.userRepository.findOne({ where: { id } });
    }
    async findOneByUsername(username) {
        return this.userRepository.findOne({ where: { username } });
    }
    async update(id, user) {
        await this.userRepository.update(id, user);
        return this.userRepository.findOne({ where: { id } });
    }
    async remove(id) {
        await this.userRepository.delete(id);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map