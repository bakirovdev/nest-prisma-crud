import { Module } from '@nestjs/common';
import { TimesService } from './times.service';
import { TimesController } from './times.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [PrismaService],
  controllers: [TimesController],
  providers: [TimesService, PrismaService]
})
export class TimesModule {}
