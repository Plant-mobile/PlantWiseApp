import { IsEmail, IsNotEmpty, IsOptional, IsString, Length, MaxLength, maxLength, MinLength } from "class-validator";

export class RegisterDto{
    @IsEmail()
    @MaxLength(250)
    @IsNotEmpty()
    email:string;
    @IsString()
    @MinLength(6)
    @IsNotEmpty()
    password:string;
   
    @IsString()
    @Length(2,150)
    username:string;
}