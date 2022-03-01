import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma } from '@prisma/client'


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }
  
  @Get()
  findAll() {
    return this.usersService.getAll();
  }

  @Post()
  create( @Body() data:Prisma.usersCreateInput) {
    return this.usersService.createUser(data)
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() data:Prisma.usersUpdateInput) {
    return this.usersService.updateUser(data, +id);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(+id);
  }
}
