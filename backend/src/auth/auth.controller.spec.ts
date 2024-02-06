import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { UsersService } from "../users/users.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UnauthorizedException } from "@nestjs/common";

describe("AuthController", () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: "mysql",
          host: "127.0.0.1",
          port: 3306,
          username: "root",
          password: "",
          database: "viact",
          entities: [User],

          synchronize: true,
        }),
        TypeOrmModule.forFeature([User]),
      ],
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            validateUser: jest.fn() as (
              username: string,
              password: string,
            ) => Promise<any>,
            login: jest.fn() as (user: any) => Promise<any>,
          },
        },
        UsersService,
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe("login", () => {
    it("should return a response when valid credentials are provided", async () => {
      const mockUser = { username: "testuser", password: "testpassword" };
      const mockResponse = {
        code: 200,
        data: {},
        message: "Successful",
      };

      authService.validateUser = jest.fn().mockResolvedValueOnce(mockUser);
      authService.login = jest.fn().mockResolvedValueOnce(mockResponse);

      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      const mockResponseRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      const response = await controller.login(
        "baophung2",
        "baophung123456",
        mockResponseRes,
      );
      expect(response).toBe(mockResponse);
    });

    it("should throw an UnauthorizedException when invalid credentials are provided", async () => {
      authService.validateUser = jest.fn().mockResolvedValueOnce(null);

      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      // Make sure to use async/await when expecting the function to throw
      await expect(
        controller.login("invaliduser", "invalidpassword", res),
      ).rejects.toThrow(UnauthorizedException);
    });
  });
});
