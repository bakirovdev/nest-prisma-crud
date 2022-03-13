import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCityDto, UpdateCityDto } from './dto';

@Injectable()
export class CitiesService {
    constructor(private prisma: PrismaService) { }
    
    async create(data: CreateCityDto) {
        try {
            return await this.prisma.city.create({
                data
            });
        } catch (error) {
            return error;
        }
        
    }

    findAll() {
        try {
            return this.prisma.city.findMany({
                select: {
                    id: true,
                    title: true,
                    active:true,
                    User: {
                        select: {
                            id: true,
                            full_name: true,
                            phone_number:true
                        }
                    }

                }
            })
        } catch (error) {
            return error;
        }
    }

    async findOne(id: number) {
        return this.prisma.city.findFirst({ where: { id } });
    }

    async update(id: number, data:UpdateCityDto) {
        await this.prisma.city.update({
            data,
            where: {id}
        })
        const city = await this.prisma.city.findFirst({ where: { id } });
        return {city, message: "The city has updated"}
    }
    async delete(id: number) {
        try {
            await this.prisma.city.delete({
                where:{id}
            })
            return {message: "The city has deleted"}
        } catch (error) {
            console.log(error);
            
            return error;
        }
    }

    
}
