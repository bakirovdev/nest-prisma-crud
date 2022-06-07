import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto, UpdateUserDto } from './dto';


@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
  constructor(private readonly usersService: UsersService) { }
  
  @Get()
  findAll() {
    return this.usersService.getAll();
  }
  
  @Get('/auth_user')
  authUser(@Request() req: any) {
    return this.usersService.authUser(req.user.id);
  }

  @Post()
  create( @Body() data:CreateUserDto) {
    return this.usersService.createUser(data)
  }
  
  @Put(':id')
  updateUser(@Param('id') id: string, @Body() data:UpdateUserDto) {
    return this.usersService.updateUser(data, +id);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(+id);
  }
}
