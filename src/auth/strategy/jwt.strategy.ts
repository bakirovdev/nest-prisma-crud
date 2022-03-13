import { Injectable } from "@nestjs/common";
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor() {
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          ignoreExpiration: true,
          secretOrKey: process.env.APP_NEST_SECRET,
        });
    }
    
    async validate(payload: any) {
        return payload; 
    }
}