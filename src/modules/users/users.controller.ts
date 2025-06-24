import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() data: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-argument
    return this.usersService.create(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.usersService.findAll();
  }
}
