import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { users, Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }
    
    async createUser(data:Prisma.usersCreateInput) {
        return this.prisma.users.create({
            data
        })
    }

    async getAll() {
        return this.prisma.users.findMany({})
    }
    async getOneById() {
        return this.prisma.users.findFirst()
    }
    async authUser(id: number) {
        return this.prisma.users.findFirst({
            select: {id:true, username:true, full_name:true, phone_number:true}
        })
    }
    
    async updateUser(data:Prisma.usersUpdateInput , id: number) {
        await this.prisma.users.update({
            data,
            where: {id}
        })
        return {message: "Foydalanuvchi o'zgartirildi"}
    }
    async deleteUser(id: number) {
        await this.prisma.users.delete({
            where: {id}
        })
        return {message: "Foydalanuvchi o'chirildi"}
    }
}
