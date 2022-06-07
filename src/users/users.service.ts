import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async createUser(data: CreateUserDto) {
        try {
            data.password = await bcrypt.hash(data.password, 9);
            const user = await this.prisma.user.create({
                data: {
                    username: data.username,
                    full_name: data.full_name,
                    password: data.password,
                    phone_number: data.phone_number || null,
                }
            });
            const newUser = this.prisma.user.findFirst({
                where: { id: user.id },
                select: {
                    id: true,
                    full_name: true,
                    phone_number: true,
                }
            })
            return newUser;
        } catch (error) {
            return error
        }
    }

    async getAll() {
        const users = this.prisma.user.findMany({
            select: {
                id: true,
                full_name: true,
                phone_number: true,
            }
        })
        return users
    }
    async getOneById() {
        return this.prisma.user.findFirst()
    }
    async authUser(id: number) {
        return this.prisma.user.findFirst({
            select: { id: true, username: true, full_name: true, phone_number: true }
        })
    }

    async updateUser(data: UpdateUserDto, id: number) {
        try {
            const oldUser = await this.prisma.user.findFirst({ where: { id } });
            if (data.password) {
                data.password = await bcrypt.hash(data.password, 9);
            }
            await this.prisma.user.update({
                data: {
                    username: data.username,
                    full_name: data.full_name,
                    phone_number: data.phone_number || oldUser.phone_number,
                    password: data.password || oldUser.password,
                },
                where: { id },

            })
            return { message: "Foydalanuvchi o'zgartirildi" }
        } catch (error) {
            return error
        }

    }
    async deleteUser(id: number) {
        await this.prisma.user.delete({
            where: { id }
        })
        return { message: "Foydalanuvchi o'chirildi" }
    }
}
