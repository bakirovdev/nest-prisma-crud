import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateGroupStudentDto } from './dto/create-group-student.dto';
import { UpdateGroupStudentDto } from './dto/update-group-student.dto';

@Injectable()
export class GroupStudentService {
  constructor(private prisma: PrismaService){}
  create(createGroupStudentDto: CreateGroupStudentDto) {
    
  }

  findAll() {
    return `This action returns all groupStudent`;
  }

  findOne(id: number) {
    return `This action returns a #${id} groupStudent`;
  }

  update(id: number, updateGroupStudentDto: UpdateGroupStudentDto) {
    return `This action updates a #${id} groupStudent`;
  }

  remove(id: number) {
    return `This action removes a #${id} groupStudent`;
  }
}
