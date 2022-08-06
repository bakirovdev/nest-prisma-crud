import { HttpException, Injectable } from '@nestjs/common';
import { contains } from 'class-validator';
import { response } from 'express';
import { PrismaService } from 'src/prisma.service';
import { CreateGroupStudentDto } from './dto/create-group-student.dto';
import { UpdateGroupStudentDto } from './dto/update-group-student.dto';

@Injectable()
export class GroupStudentService {
  constructor(private prisma: PrismaService) { }
  async create(createGroupStudentDto: CreateGroupStudentDto) {
    try {
      let student = await this.prisma.student.findFirst({
        where: {
          id: createGroupStudentDto.student_id
        }
      });
      if (student.status != 'confirmed') {
        throw new HttpException({ message: 'The student is not confirmed.' }, 400);
      }
      let group_student = await this.prisma.groupStudent.findFirst({
        where: {
          group_id: createGroupStudentDto.group_id,
          student_id: createGroupStudentDto.student_id,
        }
      })
      if (group_student) {
        throw new HttpException({ message: 'The student has already added to this group.' }, 400);
      }
      await this.prisma.groupStudent.create({
        data: {
          Student: {
            connect: { id: createGroupStudentDto.student_id }
          },
          Group: {
            connect: { id: createGroupStudentDto.group_id }
          },
          bonus: +createGroupStudentDto.bonus
        }
      })
      return { message: 'Student has added to the group !!' };
    } catch (error) {
      throw new HttpException(error.message, 400)
    }
  }

  findAll() {
    return `This action returns all groupStudent`;
  }

  async findOne(id: number, data) {
    try {
      let search = data.search || ''
      let group_students = await this.prisma.groupStudent.findMany({
        where: {
          group_id: id,
          Student: {
            OR: [
              {
                first_name: {
                  contains: search
                }
              },
              {
                last_name: {
                  contains: search
                }
              }
            ]
          }
        },
        include: {
          Student: true
        },
        orderBy: {
          id: "desc"
        }
      });

      return { data: group_students };
    } catch (error) {
      throw new HttpException(error.message, 400)

    }
  }

  async updateActive(id: number) {
    try {
      const groupStudent = await this.prisma.groupStudent.findFirst({
        where: { id: id }
      })

      await this.prisma.groupStudent.updateMany({
        where: { id: id },
        data: {
          active: !groupStudent.active
        }
      })
      return { message: 'The student data have saved' }
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, 400)
    }
  }
  async unJoinedStudents(group_id: number, search: string) {
    try {
      const students = await this.prisma.student.findMany({
        where: {
          GroupStudent: {
            every: {
              NOT: {
                group_id: group_id
              }
            }
          },
          OR: [
            {
              first_name: {
                contains: search
              }
            },
            {
              last_name: {
                contains: search
              }
            }
          ],
          status: 'confirmed'
        },
        orderBy: {
          id: 'desc'
        },
        skip: 0,
        take: 5,
      });
      return { data: students };
    } catch (error) {

    }
  }

  update(id: number, updateGroupStudentDto: UpdateGroupStudentDto) {
    return `This action updates a #${id} groupStudent`;
  }

  remove(id: number) {
    return `This action removes a #${id} groupStudent`;
  }
}
