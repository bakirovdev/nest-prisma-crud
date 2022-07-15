import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './auth/strategy/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { StudentsModule } from './students/students.module';
import { CoursesModule } from './courses/courses.module';
import { TimesModule } from './times/times.module';
import { RegionsModule } from './regions/regions.module';
import { GroupsModule } from './groups/groups.module';
import { GroupStudentModule } from './group-student/group-student.module';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: process.env.APP_NEST_SECRET || 'b@k!r0v',
      signOptions: {
        expiresIn: '2 days',
      },
    }),
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    AuthModule,
    StudentsModule,
    CoursesModule,
    TimesModule,
    RegionsModule,
    GroupsModule,
    GroupStudentModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
