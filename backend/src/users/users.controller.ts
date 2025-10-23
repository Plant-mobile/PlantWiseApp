import { Body, Controller, Get, HttpCode, HttpStatus, Post, Put, UseGuards,BadRequestException,Req} from "@nestjs/common";
import { UsersService } from "./users.service";
import { RegisterDto } from "./dtos/register.dto";
import { LoginDto } from "./dtos/login.dto";
import{User} from "./user.entity"
import { UpdateUserDto } from "./dtos/update-user.dto";
import{AuthGuard} from "./guards/auth.guard"
import { CurrentUser } from "./decorators/current-user.decorator";
import type { JWTPayloadType } from "src/utils/types";
@Controller("api/users")
export class UsersController{
    constructor(
        private readonly usersService:UsersService
    ){}
    // http://localhost:5000/api/users/auth/v1/register
    @Post("auth/register")
   public register(@Body() body:RegisterDto){
    return this.usersService.register(body)
   }
   // http://localhost:5000/api/users/auth/login
   @Post("auth/login")
   @HttpCode(HttpStatus.OK)
   public login(@Body() body: LoginDto){
    return this.usersService.login(body)
   }
   // http://localhost:5000/api/users/current-user
   @Get("current-user")
   @UseGuards(AuthGuard)
   public getCurrentUser(@CurrentUser() payload: JWTPayloadType){
    
    return this.usersService.getCurrentUser(payload.id);
    
   }
   // http://localhost:5000/api/users
   @Put()
   @UseGuards(AuthGuard)
   public updateUser(@CurrentUser() payload:JWTPayloadType,@Body() body:UpdateUserDto ){
    return this.usersService.update(payload.id, body);
   }

}