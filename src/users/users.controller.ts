import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma } from '@prisma/client'
import { AuthGuard } from '@nestjs/passport';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }
  
  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll() {
    return this.usersService.getAll();
  }
  
  @Get('/auth_user')
  @UseGuards(AuthGuard('jwt'))
  authUser(@Request() req: any) {
    return this.usersService.authUser(req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create( @Body() data:Prisma.usersCreateInput) {
    return this.usersService.createUser(data)
  }
  
  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  updateUser(@Param('id') id: string, @Body() data:Prisma.usersUpdateInput) {
    return this.usersService.updateUser(data, +id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(+id);
  }
}
