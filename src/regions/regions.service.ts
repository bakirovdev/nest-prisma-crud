import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';

@Injectable()
export class RegionsService {
  constructor(private prisma: PrismaService) { }
  async create(createRegionDto: CreateRegionDto) {
    const time = await this.prisma.region.create({
      data: createRegionDto
    });
    return time;
  }

  async findAll() {
    const times = await this.prisma.region.findMany({
      include: {
        Student: {
          select: {
            id:true,
            first_name: true,
            last_name: true,
            phone_number: true
        }
      }}
    });
    return times;
  }
  findOne(id: number) {
    const times = this.prisma.region.findFirst({
      where:{id}
    });
    return times;
  }

  async update(id: number, updateRegionDto: UpdateRegionDto) {
    await this.prisma.region.update({
      where: { id },
      data:updateRegionDto
    });
    return {message:'The region has updated'}
  }

  async remove(id: number) {
    await this.prisma.region.delete({
      where:{id}
    })
    return {message:'The region time has deleted'}
  }
  async getForAutocomplate() {
    try {
      const regions = await this.prisma.region.findMany({
        where: {
          active:true
        }
      });
      return regions;
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
