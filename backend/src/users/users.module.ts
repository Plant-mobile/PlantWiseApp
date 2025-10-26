import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersService } from "./users.service";
import { User } from "./user.entity";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
@Module({controllers:[UsersController],
    providers:[UsersService],
   
    imports:[TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
        inject:[ConfigService],
        useFactory:(config:ConfigService) =>{
            return {
                global:true,
                secret:config.get<string>("JWT_SECRET"),
                signOptions: {
         
          expiresIn: config.get('JWT_EXPIRES_IN') as `${number}${'ms' | 's' | 'm' | 'h' | 'd'}`,
        },
            };
        }
    })
],
 exports: [UsersService, JwtModule],
})
export class UsersModule{}