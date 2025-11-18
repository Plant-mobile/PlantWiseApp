import { Module } from "@nestjs/common";
//import { UsersController } from "./users.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
//import { UsersService } from "./users.service";
import { User } from "./user.entity";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import {AuthController} from "./users.controller";
import {UsersService} from "./users.service";
import { RefreshToken } from "./refresh_token.entity";
@Module({controllers:[AuthController],
    providers:[UsersService],
   
    imports:[TypeOrmModule.forFeature([User, RefreshToken]),
    JwtModule.registerAsync({
        inject:[ConfigService],
        useFactory:(config:ConfigService) =>{
            return {
                global:true,
                secret:'aaa', //config.get<string>("JWT_SECRET"),
                signOptions: {
         
          expiresIn: '1m',
        },
            };
        }
    })
],
 exports: [UsersService, JwtModule],
})
export class UsersModule{}