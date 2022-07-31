import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { PrismaService } from 'src/prisma.service';
import { Paginate } from 'src/utils/paginate';

@Module({
  imports: [PrismaService],
  controllers: [StudentsController],
  providers: [StudentsService, PrismaService, Paginate]
})
export class StudentsModule {}
