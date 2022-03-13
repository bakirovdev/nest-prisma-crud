import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }
    
    async createUser(data: CreateUserDto) {
        data.password = await bcrypt.hash(data.password, 9);
        const user = this.prisma.user.create({
            data
        });
        (await user).password = undefined
        return data;
    }

    async getAll() {
        return this.prisma.user.findMany({})
    }
    async getOneById() {
        return this.prisma.user.findFirst()
    }
    async authUser(id: number) {
        return this.prisma.user.findFirst({
            select: {id:true, username:true, full_name:true, phone_number:true}
        })
    }
    
    async updateUser(data:UpdateUserDto , id: number) {
        await this.prisma.user.update({
            data,
            where: {id}
        })
        return {message: "Foydalanuvchi o'zgartirildi"}
    }
    async deleteUser(id: number) {
        await this.prisma.user.delete({
            where: {id}
        })
        return {message: "Foydalanuvchi o'chirildi"}
    }
}
