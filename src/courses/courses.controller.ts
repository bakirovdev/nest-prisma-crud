import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post('/')
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  @Get('/')
  async findAll() {
    const courses = await this.coursesService.findAll();
    return { data: courses };
  }
  @Get('/students/:id')
  async courseStudents(@Param('id') id:string) {
    return await this.coursesService.courseStudents(+id);
  }
  @Get('/for_autocomplate')
  findAllForAutocomplate() {
    return this.coursesService.getForAutocomplate();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(+id, updateCourseDto);
  }

  @Patch('/update_active/:id')
  updateActive(@Param('id') id: string) {
    return this.coursesService.updateActive(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(+id);
  }
}
