import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [PrismaService],
  controllers: [GroupsController],
  providers: [GroupsService, PrismaService]
})
export class GroupsModule {}
