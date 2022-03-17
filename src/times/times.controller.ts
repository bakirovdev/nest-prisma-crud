import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TimesService } from './times.service';
import { CreateTimeDto } from './dto/create-time.dto';
import { UpdateTimeDto } from './dto/update-time.dto';

@Controller('times')
export class TimesController {
  constructor(private readonly timesService: TimesService) {}

  @Post('/')
  create(@Body() createTimeDto: CreateTimeDto) {
    return this.timesService.create(createTimeDto);
  }

  @Get('/')
  findAll() {
    return this.timesService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.timesService.findOne(+id);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() updateTimeDto: UpdateTimeDto) {
    return this.timesService.update(+id, updateTimeDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.timesService.remove(+id);
  }
}
