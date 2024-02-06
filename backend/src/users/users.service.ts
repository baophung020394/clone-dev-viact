import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StatusCodes } from 'http-status-codes';
import { Repository } from 'typeorm';
import { RES_MESSAGE } from '../constants/common';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(user: Partial<User>): Promise<{
    internalCode?: number;
    code: number;
    data: any;
    message: string;
  }> {
    try {
      const { username, email } = user;

      const existingUser = await this.userRepository.findOne({
        where: [{ username }, { email }],
      });

      if (!existingUser) {
        const result = this.userRepository.save(user);
        if (result)
          return {
            code: StatusCodes.OK,
            data: {},
            message: RES_MESSAGE.SUCCESS,
          };
      }

      return {
        code: StatusCodes.CONFLICT,
        internalCode: 100,
        data: {},
        message: RES_MESSAGE.USERISEXISTED,
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
        const user = await this.userRepository.findOne({
          where: [{ accessToken }],
        });
        if (user)
          return {
            code: StatusCodes.OK,
            data: {
              accessToken: user?.accessToken,
              refreshToken: user?.refreshToken,
            },
            message: RES_MESSAGE.SUCCESS,
          };
      }

      return {
        code: StatusCodes.NOT_FOUND,
        internalCode: 404,
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

  async findAll(): Promise<{
    internalCode?: number;
    code: number;
    data: any;
    message: string;
  }> {
    try {
      const users = await this.userRepository.find();

      if (users)
        return {
          code: StatusCodes.OK,
          data: {
            users,
          },
          message: RES_MESSAGE.SUCCESS,
        };

      return {
        code: StatusCodes.NOT_FOUND,
        internalCode: 404,
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

  async findOne(id: number): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findOneByUsername(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username } });
  }

  async update(id: number, user: Partial<User>): Promise<User | undefined> {
    await this.userRepository.update(id, user);
    return this.userRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
