import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Paginate } from 'src/utils/paginate';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, UpdateUserDto } from './dto';
import { contains } from 'class-validator';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService, private paginate: Paginate) { }

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
            return {message: 'New user has created'};
        } catch (error) {
            return error
        }
    }

    async getAll(data:any) {
        const query = {
            where:{
                OR:[
                    {
                        full_name: {contains:data.search || ''}
                    },
                    {
                        username: {contains:data.search || ''}
                    },
                ]
            },
        }
        let page = data.page || 1
        let paginateDetails = {
            page: page,
            model: 'user',
            query
        }
        let meta = await this.paginate.pagination(paginateDetails)
        let skip:number = (page * meta.per_page) - meta.per_page
        const users = await this.prisma.user.findMany({
            select: {
                id: true,
                full_name: true,
                username: true,
                active: true,
                phone_number: true,
            },
            orderBy:{
                id:'desc'
            },
           ...query,
           skip,
           take: +meta.per_page
        })
        return {data: users, meta}
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
    async updateActive(id:number){
        try {
            const user = await this.prisma.user.findFirst({where:{id}});
            await this.prisma.user.update({
                where:{
                    id
                },
                data:{
                    active: !user.active
                }
            })
            return {message: 'User has updated'}
        } catch (error) {
            return Promise.reject(error)
        }
    }
    async deleteUser(id: number) {
        await this.prisma.user.delete({
            where: { id }
        })
        return { message: "Foydalanuvchi o'chirildi" }
    }
}
