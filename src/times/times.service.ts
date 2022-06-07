import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateTimeDto } from './dto/create-time.dto';
import { UpdateTimeDto } from './dto/update-time.dto';

@Injectable()
export class TimesService {
  constructor(private prisma: PrismaService) { }
  async create(createTimeDto: CreateTimeDto) {
    const data = createTimeDto;
    const time = await this.prisma.time.create({
      data
    });
    return {data:time}
  }

  async findAll() {
    const times = this.prisma.time.findMany();
    return times;
  }

  findOne(id: number) {
    const times = this.prisma.time.findFirst({
      where:{id}
    });
    return times;
  }

  async update(id: number, updateTimeDto: UpdateTimeDto) {
    await this.prisma.time.update({
      where: { id },
      data:updateTimeDto
    });
    return {message:'The course time has updated'}
  }

  remove(id: number) {
    this.prisma.time.delete({
      where:{id}
    })
    return {message:'The course time has deleted'}
  }
}
