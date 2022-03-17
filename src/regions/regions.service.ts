import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';

@Injectable()
export class RegionsService {
  constructor(private prisma: PrismaService) { }
  create(createRegionDto: CreateRegionDto) {
    const time = this.prisma.region.create({
      data:createRegionDto
    });
  }

  async findAll() {
    const times = this.prisma.region.findMany();
    return times;
  }

  findOne(id: number) {
    const times = this.prisma.region.findFirst({
      where:{id}
    });
    return times;
  }

  update(id: number, updateRegionDto: UpdateRegionDto) {
    this.prisma.region.update({
      where: { id },
      data:updateRegionDto
    });
    return {message:'The region has updated'}
  }

  remove(id: number) {
    this.prisma.region.delete({
      where:{id}
    })
    return {message:'The region time has deleted'}
  }
}
