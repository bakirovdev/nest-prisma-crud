import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';


@Module({
  imports: [
    UsersModule,
    
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}