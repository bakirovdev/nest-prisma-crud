import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService){}
  create(creatCourseDto: CreateCourseDto) {
    const course = this.prisma.course.create({
      data:creatCourseDto
    });
    return course;
  }

  async findAll() {
    const courses = await this.prisma.course.findMany({});
    return courses;
  }

  async findOne(id: number) {
    const course = await this.prisma.course.findFirst({
      where:{id}
    })
    return course;
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    const course = await this.prisma.course.update({
      where: {
        id
      },
      data:updateCourseDto
    });
    return {message: 'The course has updated!'};
  }
  async updateActive(id: number) {
    const course = await this.prisma.course.findFirst({
      where: {
        id
      }
    });
    
    await this.prisma.course.update({
      where: {
        id
      }, 
      data: {
        active: !course.active
      }
    })
    return {message: 'The course has updated!'};
  }

  remove(id: number) {
    this.prisma.course.delete({ where: { id } });
    return {message: 'The course has deleted!'};
  }
  async getForAutocomplate() {
    try {
      const courses = await this.prisma.course.findMany({
        where: {
          active:true
        }
      });
      return courses;
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async courseStudents(id:number) {
    try {
      const students = await this.prisma.student.findMany({
        include: {
          Region: {
            select: {
              id: true,
              title: true
            }
          },
          Gender: {
            select: {
              id: true,
              title: true
            }
          },
        }
      })
      return students;
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
