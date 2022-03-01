import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { users, Prisma } from '@prisma/client'
import { response } from 'express';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }
    
    async createUser(data) {
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
