import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Paginate } from 'src/utils/paginate';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentsService {
  private paginate: Paginate
  constructor(private prisma: PrismaService, pagination: Paginate) {
    this.paginate = pagination
  };
  async create(createStudentDto: CreateStudentDto) {
    try {
      const student = await this.prisma.student.create({
        data: {
          first_name: createStudentDto.first_name,
          last_name: createStudentDto.last_name,
          phone_number: createStudentDto.phone_number,
          birthday: new Date(createStudentDto.birthday),
          Region: {
            connect: { id: createStudentDto.region_id }
          },
          Gender: {
            connect: { id: createStudentDto.gender_id }
          },
          status: 'waiting'
        },
        select: {
          id: true,
          first_name: true,
          last_name: true,
          phone_number: true,
          birthday: true,
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
          }
        }
      });
      return student;
    } catch (error) {
      return { error: error.message };
    }
  }

  async findAll(data: any) {
    try {
      let search = data.search || '';
      let status = data.status || undefined;
      let dates = data.dates ?? [];
      let query = {
        where: {
          status, OR: [
            {
              first_name: {
                contains: search,
              }
            },
            {
              last_name: {
                contains: search,
              }
            }
          ],
          created_at: {
            gte: dates[0] ? new Date(dates[0]) : undefined,
            lt: dates[1] ? new Date(dates[1]) : undefined,
          },
        },
      };
      let page = data.page || 1
      let paginateDetails = {
        page: page,
        model: 'student',
        query
      }
    
      let meta = await this.paginate.pagination(paginateDetails)
      let skip: number = (page * meta.per_page) - meta.per_page
      const users = await this.prisma.student.findMany({
        ...query,
        orderBy: {
          id: 'desc'
        },
        include: {
          Region: true,
          Gender: true
        },
        skip,
        take: +meta.per_page
      })

      return { data: users, meta};
    } catch (error) {
      return { error: error.message }
    }
  }

  findOne(id: number) {
    try {
      const student = this.prisma.student.findFirst({
        where: {
          id
        },
        include: {
          Region: true,
          Gender: true,
        }
      })
      return student;
    } catch (error) {
      return error.message;
    }
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    try {
      await this.prisma.student.update({
        where: { id },
        data: {
          first_name: updateStudentDto.first_name,
          last_name: updateStudentDto.last_name,
          phone_number: updateStudentDto.phone_number,
          birthday: new Date(updateStudentDto.birthday),
          region_id: updateStudentDto.region_id,
          gender_id: updateStudentDto.gender_id,
          status: 'waiting'
        },
      })
      const user = this.prisma.student.findFirst({
        where: {
          id
        },
        include: {
          Region: true,
          Gender: true
        }
      })
      return user;
    } catch (error) {
      return error.message
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.student.delete({
        where: { id }
      })
      return { message: "The student has deleted" };
    } catch (error) {
      return error.message
    }
  }
}
