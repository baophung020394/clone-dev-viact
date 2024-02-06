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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const responseHandler_1 = require("../helpers/responseHandler");
const users_service_1 = require("../users/users.service");
const auth_service_1 = require("./auth.service");
const constants_1 = require("./constants");
const common_2 = require("../constants/common");
let AuthController = class AuthController {
    constructor(authService, userService) {
        this.authService = authService;
        this.userService = userService;
    }
    async register(user, res) {
        const { internalCode, code, data, message } = await this.authService.register(user);
        console.log("this.authService.register(user)", await this.authService.register(user));
        if (internalCode !== 100) {
            (0, responseHandler_1.jsonResponse)(res, message, data, code, internalCode);
        }
        else {
            (0, responseHandler_1.jsonResponse)(res, message, data, code, internalCode);
        }
    }
    async login(username, password, res) {
        const user = await this.authService.validateUser(username, password);
        if (user) {
            const { internalCode, code, data, message } = await this.authService.login(user);
            (0, responseHandler_1.jsonResponse)(res, message, data, code, internalCode);
        }
        else {
            (0, responseHandler_1.jsonResponse)(res, common_2.RES_MESSAGE.LOGINFAIL, {}, 200, 400);
        }
    }
    async getUserByToken(accessToken, res) {
        const { internalCode, code, data, message } = await this.authService.findUserByToken(accessToken);
        (0, responseHandler_1.jsonResponse)(res, message, data, code, internalCode);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)("register"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)("login"),
    __param(0, (0, common_1.Body)("username")),
    __param(1, (0, common_1.Body)("password")),
    __param(2, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)("verify"),
    __param(0, (0, common_1.Body)("accessToken")),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getUserByToken", null);
exports.AuthController = AuthController = __decorate([
    (0, constants_1.Public)(),
    (0, common_1.Controller)("api/v1/auth"),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        users_service_1.UsersService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map