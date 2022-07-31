import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { GroupStudentService } from './group-student.service';
import { CreateGroupStudentDto } from './dto/create-group-student.dto';
import { UpdateGroupStudentDto } from './dto/update-group-student.dto';
import { AuthGuard } from '@nestjs/passport';

type unJoined = {
  group_id: number|string;
  search: number|string;
}

@Controller('group_students')
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

  @Get('/un_joined_student')
  unJoinedStudent(@Query() data: unJoined){
    return this.groupStudentService.unJoinedStudents(+data.group_id, `${data.search}`)
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Query() data: any) {
    return this.groupStudentService.findOne(+id, data);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupStudentDto: UpdateGroupStudentDto) {
    return this.groupStudentService.update(+id, updateGroupStudentDto);
  }
  
  @Patch('update_active/:id')
  updateActive(@Param('id') id: string) {
    return this.groupStudentService.updateActive(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupStudentService.remove(+id);
  }
}
