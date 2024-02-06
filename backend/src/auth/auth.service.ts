import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import * as bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import { RES_MESSAGE } from "../constants/common";
import { User } from "src/entities/user.entity";
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(user: Partial<User>): Promise<{
    internalCode?: number;
    code: number;
    data: any;
    message: string;
  }> {
    try {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;

      if (user) {
        const result = await this.userService.create(user);

        if (result?.code === StatusCodes.OK) {
          return {
            code: StatusCodes.OK,
            data: {},
            message: RES_MESSAGE.SUCCESS,
          };
        } else {
          return {
            code: StatusCodes.CONFLICT,
            internalCode: 100,
            data: {},
            message: RES_MESSAGE.USERISEXISTED,
          };
        }
      }

      return {
        code: StatusCodes.BAD_REQUEST,
        internalCode: StatusCodes.BAD_REQUEST,
        data: {},
        message: RES_MESSAGE.FAILURE,
      };
    } catch (error) {
      return {
        code: StatusCodes.INTERNAL_SERVER_ERROR,
        data: {},
        message: RES_MESSAGE.FAILURE,
      };
    }
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOneByUsername(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: Partial<User>): Promise<{
    internalCode?: number;
    code: number;
    data: any;
    message: string;
  }> {
    try {
      if (user) {
        const payload = { username: user.username, sub: user.id };
        const accessToken = await this.jwtService.sign(payload);
        const updateUser = await this.userService.update(user.id, {
          accessToken,
        });
        if (updateUser) {
          return {
            code: StatusCodes.OK,
            data: {
              ...user,
              accessToken,
            },
            message: RES_MESSAGE.SUCCESS,
          };
        }
      }
      return {
        code: StatusCodes.BAD_REQUEST,
        internalCode: StatusCodes.BAD_REQUEST,
        data: {},
        message: RES_MESSAGE.FAILURE,
      };
    } catch (error) {
      return {
        code: StatusCodes.INTERNAL_SERVER_ERROR,
        data: {},
        message: RES_MESSAGE.FAILURE,
      };
    }
  }

  async findUserByToken(accessToken: string): Promise<{
    internalCode?: number;
    code: number;
    data: any;
    message: string;
  }> {
    try {
      if (accessToken) {
        const verifyToken = this.jwtService.verify(accessToken);
        console.log("verifyToken", verifyToken);

        if (verifyToken) {
          const user = await this.userService.findUserByToken(accessToken);
          console.log("user", user);
          if (user)
            return {
              code: StatusCodes.OK,
              data: {
                accessToken: user?.data.accessToken,
                refreshToken: user?.data.refreshToken,
              },
              message: RES_MESSAGE.SUCCESS,
            };
        }
      }
      return {
        code: StatusCodes.BAD_REQUEST,
        internalCode: StatusCodes.BAD_REQUEST,
        data: {},
        message: RES_MESSAGE.FAILURE,
      };
    } catch (error) {
      return {
        code: StatusCodes.INTERNAL_SERVER_ERROR,
        data: {},
        message: RES_MESSAGE.FAILURE,
      };
    }
  }
}
