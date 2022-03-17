import { Module } from '@nestjs/common';
import { WeaksService } from './weaks.service';
import { WeaksController } from './weaks.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports:[PrismaService],
  controllers: [WeaksController],
  providers: [WeaksService, PrismaService]
})
export class WeaksModule {}
