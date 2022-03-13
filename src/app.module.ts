import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './auth/strategy/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';


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
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
