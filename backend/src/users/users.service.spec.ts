import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "./users.service";
import { UserController } from "./user.controller";
import { User } from "../entities/user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

describe("UsersService", () => {
  let service: UsersService;
  let controller: UserController;

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
          // entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([User]),
      ],
      controllers: [UserController],
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
    controller = module.get<UserController>(UserController);
  });

  describe("findAll", () => {
    it("should return an array of users", async () => {
      const result = {
        code: 200,
        data: {},
        message: "Success",
      };

      // Mock Response

      jest
        .spyOn(service, "findAll")
        .mockImplementation(() => Promise.resolve(result));
      const response = await controller.getAll();
      expect(response).toBe(result);
    });
  });
});
