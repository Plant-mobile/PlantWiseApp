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
    @IsOptional()
    @IsString()
    @Length(2,150)
    username:string;
    @IsString()
    @MinLength(6)
    @IsNotEmpty()
    passwordAgain:string;
}