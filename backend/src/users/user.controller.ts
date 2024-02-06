import { Controller, Get, Response } from '@nestjs/common';

import { jsonResponse } from '../helpers/responseHandler';
import { UsersService } from './users.service';

@Controller('api/v1/users')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Get('/')
  async getAll() {
    return await this.userService.findAll();
  }
}
