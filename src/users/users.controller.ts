import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto, UpdateUserDto } from './dto';


@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
  constructor(private readonly usersService: UsersService) { }
  
  @Get()
  findAll(@Query() data:any) {
    return this.usersService.getAll(data);
  }
  
  @Get('/auth_user')
  authUser(@Request() req: any) {
    return this.usersService.authUser(req.user.id);
  }

  @Post()
  create( @Body() data:CreateUserDto) {
    return this.usersService.createUser(data)
  }

  @Patch('/update_active/:id')
  updateActive(@Param('id') id: string|number) {
    return this.usersService.updateActive(+id);
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
