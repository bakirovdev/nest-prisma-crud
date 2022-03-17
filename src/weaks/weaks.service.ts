import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateWeakDto } from './dto/create-weak.dto';
import { UpdateWeakDto } from './dto/update-weak.dto';

@Injectable()
export class WeaksService {
  constructor(private prisma: PrismaService){}
  create(createWeakDto: CreateWeakDto) {
    const course = this.prisma.weak.create({
      data:createWeakDto
    });
    return course;
  }

  async findAll() {
    const courses = await this.prisma.weak.findMany();
    return courses;
  }

  async findOne(id: number) {
    const course = await this.prisma.weak.findFirst({
      where:{id}
    })
    return course;
  }

  update(id: number, updateWeakDto: UpdateWeakDto) {
    const course = this.prisma.weak.update({
      where: {
        id
      },
      data:updateWeakDto
    });
    return {message: 'The course has updated!'};
  }

  remove(id: number) {
    this.prisma.weak.delete({ where: { id } });
    return {message: 'The course has deleted!'};
  }
}
