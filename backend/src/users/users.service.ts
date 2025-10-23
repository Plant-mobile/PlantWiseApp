import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { RegisterDto } from "./dtos/register.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository, UpdateDescription } from "typeorm";
import * as bcrypt from 'bcryptjs';
import { LoginDto } from "./dtos/login.dto";
import { JwtService } from "@nestjs/jwt";
import{JWTPayloadType,AccessTokenType} from "../utils/types"
import { UpdateUserDto } from "./dtos/update-user.dto";

@Injectable()
export class UsersService{
constructor(
@InjectRepository(User) private readonly usersRepository:Repository<User>,
private readonly jwtService:JwtService,

){}
/**
 *create new user
 * @param registerDto data for create new user
 * @returns JWT (access token)
 */
public  async register(registerDto:RegisterDto):Promise<AccessTokenType>{
    const{email,password,username,passwordAgain}=registerDto;
    if (password !== passwordAgain) {
    throw new BadRequestException("Passwords do not match");}
    const userFromDb=await this.usersRepository.findOne({where:{email}})
    if(userFromDb) throw new BadRequestException("user already exist");
    const salt=await bcrypt.genSalt(10);
    const hasheadPassword=await bcrypt.hash(password,salt);
    let newUser=this.usersRepository.create({
        email,
        username,
        password:hasheadPassword,
    });
    newUser=await this.usersRepository.save(newUser);
    
    const accessToken=await this.generateJWT({id:newUser.id,email:newUser.email});
    return {accessToken};
}
/**
 * log in user
 * @param loginDto data for log in to user account
 * @returns JWT (access toke)
 */
    public async login(loginDto:LoginDto):Promise<AccessTokenType>{
        const{email,password}=loginDto;
        const user =await this.usersRepository.findOne({where:{email}});
        if(!user) throw new BadRequestException("invalid email or password");
       const isPasswordMatch= await bcrypt.compare(password,user.password);
       if(!isPasswordMatch) throw new BadRequestException("invalid email or password");
      const accessToken=await this.generateJWT({id:user.id,email:user.email});
      return {accessToken};

    }
    /**
     * update user 
     * @param id id of logged in user
     * @param updateUserDto data for updating the user
     * @returns updated user from the database
     */
    public async update(id:number, updateUserDto: UpdateUserDto){
        const{currentPassword,username,email,newPassword,confirmNewPassword} =updateUserDto;
        const user=await this.usersRepository.findOne({where:{id}});
        
        user!.username=username ?? user!.username;
        user!.email = email ?? user!.email;
if (newPassword && confirmNewPassword) {
   
    if (!currentPassword) {
      throw new BadRequestException("Current password is required to change password");
    }
    const isPasswordMatch = await bcrypt.compare(currentPassword, user!.password);
    if (!isPasswordMatch) {
      throw new BadRequestException("Current password is incorrect");
    }
    if (newPassword !== confirmNewPassword) {
      throw new BadRequestException("New passwords do not match");
    }

            const salt =await bcrypt.genSalt(10);
            user!.password=await bcrypt.hash(newPassword,salt);
        }
        return this.usersRepository.save(user!);
    }
    /**
     * Get current user (logged in user)
     * @param id  id of the logged in user
     * @returns the user from the database
     */
    public async getCurrentUser(id:number){
       
        const user=await this.usersRepository.findOne({where:{id}});
        if (!user) throw new NotFoundException("user not found");
        return user;
    }
    /**
     * generate Json web Token 
     * @param payload JWT payload
     * @returns token
     */
    private generateJWT(payload:JWTPayloadType):Promise<string>{
        return this.jwtService.signAsync(payload);
    }

}
