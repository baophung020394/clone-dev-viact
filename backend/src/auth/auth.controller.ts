import {
  Body,
  Controller,
  Post,
  Response,
  UnauthorizedException,
} from "@nestjs/common";

import { User } from "../entities/user.entity";
import { jsonResponse } from "../helpers/responseHandler";
import { UsersService } from "../users/users.service";
import { AuthService } from "./auth.service";
import { Public } from "./constants";
import { RES_MESSAGE } from "src/constants/common";

@Public()
@Controller("api/v1/auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Post("register")
  async register(@Body() user: Partial<User>, @Response() res) {
    const { internalCode, code, data, message } =
      await this.authService.register(user);
    console.log(
      "this.authService.register(user)",
      await this.authService.register(user),
    );
    if (internalCode !== 100) {
      jsonResponse(res, message, data, code, internalCode);
    } else {
      jsonResponse(res, message, data, code, internalCode);
    }
  }

  @Post("login")
  async login(
    @Body("username") username: string,
    @Body("password") password: string,
    @Response() res,
  ) {
    const user = await this.authService.validateUser(username, password);
    if (user) {
      const { internalCode, code, data, message } =
        await this.authService.login(user);
      jsonResponse(res, message, data, code, internalCode);
    } else {
      jsonResponse(res, RES_MESSAGE.LOGINFAIL, {}, 200, 400);
    }
  }

  @Post("verify")
  async getUserByToken(
    @Body("accessToken") accessToken: string,
    @Response() res,
  ) {
    const { internalCode, code, data, message } =
      await this.authService.findUserByToken(accessToken);
    jsonResponse(res, message, data, code, internalCode);
  }
}
