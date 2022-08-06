import { PrismaService } from '../prisma.service';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

type paginateType = {
    page: number,
    model: string,
    query: any
}
type responseType = {
    current_page: number,
    last_page: number,
    from: number,
    per_page: number
}

@Injectable()
export class Paginate {
    @Inject(ConfigService)
    public config: ConfigService;
    constructor(private prisma: PrismaService) {}
    public async pagination(data: paginateType): Promise<responseType> {
        let limit: any = process.env.PG;
        let total_count: any = await this.prisma[data.model].aggregate({
            ...data.query,
            _count:{
                id:true
            }
        });
        let from: number = data.page -1 == 0 ? 1 : data.page -1;
        let count = Math.ceil(total_count._count.id / +limit);
        return {current_page: data.page, last_page: count, from, per_page: +limit};
    }
}