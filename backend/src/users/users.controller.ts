// import { Body, Controller, Get, HttpCode, HttpStatus, Post, Put, UseGuards,BadRequestException,Req} from "@nestjs/common";
// import { UsersService } from "./users.service";
// import { RegisterDto } from "./dtos/register.dto";
// import { LoginDto } from "./dtos/login.dto";
// import{User} from "./user.entity"
// import { UpdateUserDto } from "./dtos/update-user.dto";
// import{AuthGuard} from "./guards/auth.guard"
// import { CurrentUser } from "./decorators/current-user.decorator";
// import type { JWTPayloadType } from "src/utils/types";
// import { Roles } from "./decorators/user-role.decorator";
// import { AuthRolesGuard} from "./guards/auth-roles.guard";
// import { ForgotPasswordDto } from "./dtos/forgot-password.dto";
// import {ResetPasswordDto} from "./dtos/reset-password.dto"
// @Controller("api/users")
// export class UsersController{
//     constructor(
//         private readonly usersService:UsersService
//     ){}
//     // http://localhost:5000/api/users/auth/register
//     @Post("auth/register")
//    public register(@Body() body:RegisterDto){
//     return this.usersService.register(body)
//    }
//    // http://localhost:5000/api/users/auth/login
//    @Post("auth/login")
//    @HttpCode(HttpStatus.OK)
//    public login(@Body() body: LoginDto){
//       return this.usersService.login(body)
//    }
//    // http://localhost:5000/api/users/current-user
//    @Get("current-user")
//    @UseGuards(AuthGuard)
//    public getCurrentUser(@CurrentUser() payload: JWTPayloadType){

//     return this.usersService.getCurrentUser(payload.id);

//    }
//    // http://localhost:5000/api/users
//    @Put()
//    @UseGuards(AuthGuard)
//    public updateUser(@CurrentUser() payload:JWTPayloadType,@Body() body:UpdateUserDto ){
//     return this.usersService.update(payload.id, body);
//    }



// //   @Post('forgot-password')
// // async forgotPassword(@Body() dto: ForgotPasswordDto) {
// //   await this.usersService.forgotPassword(dto.email);
// //   return { message: 'Reset password link has been sent to your email' };
// // }

// // @Post('reset-password')
// // async resetPassword(@Body() dto: ResetPasswordDto) {
// //   await this.usersService.resetPasswordByToken(dto.token, dto.newPassword);
// //   return { message: 'Password updated successfully' };
// // }

// }
// auth.controller.ts
import { Body, Controller, Get, Headers, Post, Req, SetMetadata, UseGuards } from '@nestjs/common';
import { UsersService } from "./users.service";
import { RegisterDto } from "./dtos/register.dto";
import { AuthRolesGuard } from '../guards/auth-roles.guard';
import { ForgotPasswordDto } from './dtos/forgot-password.dto';
import { VerifyCodeDto } from './dtos/verify-code.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';

@Controller("api/users")
export class AuthController {
  constructor(private usersService: UsersService,

  ) { }


  @Post("auth/register")
  public register(@Body() body: RegisterDto) {
    return this.usersService.register(body)
  }

  @Post('auth/login')
  async login(@Body() body: { email: string; password: string }) {
    return this.usersService.login(body.email, body.password);
  }

  @Post('auth/forgot-password')
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    await this.usersService.forgotPassword(dto.email);
    return { message: 'Code has been sent to your email' };
  }

  @Post('auth/verify-reset-code')
  verifyResetCode(@Body() dto: VerifyCodeDto) {
    return this.usersService.verifyResetCode(dto.email, dto.code);
  }

  @Post('auth/reset-password')
  async resetPassword(
  @Headers('authorization') authHeader: string,
  @Body('newPassword') newPassword: string,
) {
  const token = authHeader?.split(' ')[1];
  return this.usersService.resetPassword(token, newPassword);
}

  @Post('auth/logout')
  // @SetMetadata('isAdmin', true)
  async logout(@Body() body: { refreshToken: string }) {
    return this.usersService.logout(body.refreshToken);
  }

  @UseGuards(AuthRolesGuard)
  @Post('auth/refresh')
  async refresh(@Body() body: { refreshToken: string }) {
    return this.usersService.refresh(body.refreshToken);
  }
}