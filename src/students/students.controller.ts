import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('students')
@UseGuards(AuthGuard('jwt'))
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post('/')
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  // @UseGuards(AuthGuard('jwt'))
  @Get('/')
  findAll(@Query() data: any ) {
    return this.studentsService.findAll(data);
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(+id);
  }

  
  @Patch('/:id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentsService.update(+id, updateStudentDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.studentsService.remove(+id);
  }
}
