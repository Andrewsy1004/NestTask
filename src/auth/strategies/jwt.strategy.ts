import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";
import { JwtPayload } from "jsonwebtoken";



@Injectable()
export class JwtStrategy extends PassportStrategy( Strategy ) {
    
    constructor(
        @InjectRepository( User )
        private readonly userRepository: Repository<User>,
    ) {

        super({
            secretOrKey: process.env.JWT_SECRET,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }
    
    async validate( payload: JwtPayload ): Promise<User> {
        const { id } = payload;
        
        const user = await this.userRepository.findOneBy({ id });

        if ( !user ) throw new UnauthorizedException('Token not valid')
            
        if ( !user.isActive )  throw new UnauthorizedException('User is inactive, talk with an admin');
            
        return user;
    }
  
}