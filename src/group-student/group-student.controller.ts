import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { GroupStudentService } from './group-student.service';
import { CreateGroupStudentDto } from './dto/create-group-student.dto';
import { UpdateGroupStudentDto } from './dto/update-group-student.dto';
import { AuthGuard } from '@nestjs/passport';
  
@Controller('group-student')
@UseGuards(AuthGuard('jwt'))
export class GroupStudentController {
  constructor(private readonly groupStudentService: GroupStudentService) {}

  @Post()
  create(@Body() createGroupStudentDto: CreateGroupStudentDto) {
    return this.groupStudentService.create(createGroupStudentDto);
  }

  @Get()
  findAll() {
    return this.groupStudentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupStudentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupStudentDto: UpdateGroupStudentDto) {
    return this.groupStudentService.update(+id, updateGroupStudentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupStudentService.remove(+id);
  }
}
