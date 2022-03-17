import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WeaksService } from './weaks.service';
import { CreateWeakDto } from './dto/create-weak.dto';
import { UpdateWeakDto } from './dto/update-weak.dto';

@Controller('weaks')
export class WeaksController {
  constructor(private readonly weaksService: WeaksService) {}

  @Post('/')
  create(@Body() createWeakDto: CreateWeakDto) {
    return this.weaksService.create(createWeakDto);
  }

  @Get('/')
  findAll() {
    return this.weaksService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.weaksService.findOne(+id);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() updateWeakDto: UpdateWeakDto) {
    return this.weaksService.update(+id, updateWeakDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.weaksService.remove(+id);
  }
}
