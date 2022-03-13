import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CreateCityDto, UpdateCityDto } from './dto';

@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) { }
  @Post('/')
  create(@Body() data:CreateCityDto) {
    return this.citiesService.create(data);
  }

  @Get('/')
  findAll() {
    return this.citiesService.findAll()
  }
  @Get('/:id')
  findOne(@Param('id') id: number|string) {
    return this.citiesService.findOne(+id);
  }

  @Put('/:id')
  update(@Param('id') id:number|string, @Body() data: UpdateCityDto) {
    return this.citiesService.update(+id, data)
  }
  @Delete('/:id')
  delete(@Param('id') id:number) {
    return this.citiesService.delete(+id)
  }
}
