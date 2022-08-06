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
          Course:{
            connect:{id: createGroupDto.course_id}
          }
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
              where: {
                active: true
              },
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
      return await this.prisma.$transaction(async (prisma) =>{
        await prisma.group.update({
          where: { id: id },
          data: {
            title: updateGroupDto.title,
            course_id: updateGroupDto.course_id
          }
        })
        let haveTimes = await prisma.groupLessonTime.findMany({
          where:{
            group_id: id,
            active: true,
            time_id:{
              in: updateGroupDto.times
            }
          }
        })
        let have_times: number[]
        have_times = []
        haveTimes.map((el)=>{
          have_times.push(el.time_id)
        });
        await prisma.groupLessonTime.updateMany({
          where:{
            group_id: id, 
            Time:{
              id:{
                notIn: have_times
              }
            }
          },
          data:{
            active:false
          }
        })
        let mustCreate = this.array_diff(have_times, updateGroupDto.times);
        let data = [];
        mustCreate.map((el) => {
          data.push({
            group_id: id,
            time_id: +el
          })
        })
        await prisma.groupLessonTime.createMany({
          data
        })
        return {message: 'Group just has updated'}
      })
    } catch (error) {
      throw new HttpException(error.message, 400)
    }
  }

  remove(id: number) {
    return `This action removes a #${id} group`;
  }
  async groupLessonTime(id:number){
    const groupLessonTime = await this.prisma.groupLessonTime.findMany({
      where:{
        group_id: id
      },
      include:{
        Time:true
      }
    })
    return {data:groupLessonTime||[]};
  }
  array_diff(arr1:string[] | number[], arr2:string[] | number[]){
    let arr = [], diff = [];
    for (let i = 0; i < arr1.length; i++) {
      arr[arr1[i]] = true
    }

    for (let i = 0; i < arr2.length; i++) {
      if (arr[arr2[i]]) {
        delete arr[arr2[i]]
      } else {
        arr[arr2[i]] = true
      }
    }

    for (let k in arr) {
      diff.push(k)
    }
    return diff
  }
}
