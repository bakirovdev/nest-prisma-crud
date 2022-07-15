import { Module } from '@nestjs/common';
import { GroupStudentService } from './group-student.service';
import { GroupStudentController } from './group-student.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports:  [PrismaService],
  controllers: [GroupStudentController],
  providers: [GroupStudentService, PrismaService]
})
export class GroupStudentModule {}
