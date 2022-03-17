import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateTimeDto } from './dto/create-time.dto';
import { UpdateTimeDto } from './dto/update-time.dto';

@Injectable()
export class TimesService {
  constructor(private prisma: PrismaService) { }
  create(createTimeDto: CreateTimeDto) {
    const time = this.prisma.time.create({
      data:createTimeDto
    });
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

  update(id: number, updateTimeDto: UpdateTimeDto) {
    this.prisma.time.update({
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
