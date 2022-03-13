import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
import { AuthDto } from './dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private prisma: PrismaService){}
  async authenticate(authDto: AuthDto) {
    if (process.env.APP_NEST_SECRET !== authDto.client_secret) throw new UnauthorizedException('User does not exist!');
    const user = await this.prisma.user.findFirst({
      where: {username: authDto.username}
    })
    if (!user) throw new UnauthorizedException('User does not exist');
    
    const isEqualPassword = await bcrypt.compare(
      authDto.password,
      user.password
    );
    // console.log(isPasswordMatching);
    
    if (!isEqualPassword) {
      throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
    }
    user.password = undefined;

    return this.signUser(user.id, user.username, user.full_name); 
  }

  signUser(userId: number, username: string, full_name:string) {
        let access_token = this.jwtService.sign({
            id: userId,
            username,
            full_name,
        })
        return {access_token, refresh_token: ""}
    }
}
