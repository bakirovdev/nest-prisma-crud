import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma.service';
import { Paginate } from 'src/utils/paginate';

@Module({
  imports: [PrismaService],
  controllers: [UsersController],
  providers: [UsersService, PrismaService, Paginate]
})
export class UsersModule {}
