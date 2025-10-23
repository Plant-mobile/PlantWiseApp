import { IsEmail, IsNotEmpty, IsString, MaxLength, maxLength, MinLength } from "class-validator";

export class LoginDto{
    @IsEmail()
    @MaxLength(250)
    @IsNotEmpty()
    email:string;
    @IsString()
    @MinLength(6)
    @IsNotEmpty()
    password:string;
    
}