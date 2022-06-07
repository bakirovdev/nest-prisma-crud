import { Injectable, HttpException, HttpStatus   } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { FilterGroupDto } from './dto/filter-group.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class GroupsService {
  constructor(private prisma: PrismaService){}
  async create(createGroupDto: CreateGroupDto) {
    try {
      const group = await this.prisma.group.create({
        data: {
          title: createGroupDto.title,
          course_id: createGroupDto.course_id
        }
      })
      const timeId = createGroupDto.times;
      let data = [];
      timeId.forEach(element => {
        data.push({group_id: group.id, time_id: element})
      })
      await this.prisma.groupLessonTime.createMany({
        data:data
      })
      return { message: 'The group just have created' };
    } catch (error) {
      throw new HttpException(error.message, 400)
    }
  }

  async findAll(data: FilterGroupDto) {
    try {
      const groups =  this.prisma.group.findMany({
        where: {
          OR: [
            {
              title: {
                contains: data.search,
              }
            },
            {
              Course: {
                title: {
                  contains: data.search,  
                }
              }
            },
          ]
            
        },
        include: {
          GroupLessonTime: {
              include:{Time: true}
          },
          Course: true
        },
        orderBy:{ id: 'desc'}
      });
      return groups;
      
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} group`;
  }

  async update(id: number, updateGroupDto: UpdateGroupDto) {
    try {
      await this.prisma.group.update({
        data: {
          title: updateGroupDto.title,
          course_id: updateGroupDto.course_id
        },
        where: { id: id }
      })
      return {message: 'The group just has updated'}
    } catch (error) {
      throw new HttpException(error.message, 400)
    }
  }

  remove(id: number) {
    return `This action removes a #${id} group`;
  }
}
