// import { BadRequestException, Delete, Injectable, NotFoundException, Res } from "@nestjs/common";
// import { InjectRepository } from "@nestjs/typeorm";
// import { Repository } from "typeorm";
// import { User } from "./user.entity";
// import { RegisterDto } from "./dtos/register.dto";
// import { LoginDto } from "./dtos/login.dto";
// import { UpdateUserDto } from "./dtos/update-user.dto";
// import { JWTPayloadType, AccessTokenType, LoginData } from "../utils/types";
// import { JwtService } from "@nestjs/jwt";
// import * as bcrypt from 'bcryptjs';
// // import { randomBytes } from 'crypto';
// import crypto from "crypto";
// // import * as nodemailer from 'nodemailer';

// @Injectable()
// export class UsersService {
//   constructor(
//     @InjectRepository(User) private readonly usersRepository: Repository<User>,
//     private readonly jwtService: JwtService,
//   ) { }
//   /**
//    *create new user
//    * @param registerDto data for create new user
//    * @returns JWT (access token)
//    */
//   public async register(registerDto: RegisterDto): Promise<AccessTokenType> {
//     const { email, password, username } = registerDto;


//     const userFromDb = await this.usersRepository.findOne({ where: { email } });
//     if (userFromDb) throw new BadRequestException("User already exists");

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const refreshToken = this.generateRefreshToken();

//     let newUser = this.usersRepository.create({
//       email,
//       username,
//       password: hashedPassword,
//       // recovery_token: refreshToken,
//       // recovery_sent_at: null,
//     });
//     newUser = await this.usersRepository.save(newUser);

//     const accessToken = await this.generateJWT({ id: newUser.id, email: newUser.email });
//     return { accessToken };
//   }
//   /**
//    * log in user
//    * @param loginDto data for log in to user account
//    * @returns JWT (access toke) and user info
//    */
//   public async login(loginDto: LoginDto): Promise<any> {
//     const { email, password } = loginDto;
//     const user = await this.usersRepository.findOne({ where: { email } });
//     if (!user) return { success: false, message: " Invalid email or password "};

//     const isPasswordMatch = await bcrypt.compare(password, user.password);
//     if (!isPasswordMatch) return { success: false, message: " Invalid email or password "};

//     const accessToken = await this.generateJWT({ id: user.id, email: user.email });

//     const { password: _, ...safeUser } = user;
//     return { success: true, accessToken, user: safeUser };
//   }
//   /**
//       * update user 
//       * @param id id of logged in user
//       * @param updateUserDto data for updating the user
//       * @returns updated user from the database
//       */
//   public async update(id: number, updateUserDto: UpdateUserDto) {
//     const { currentPassword, username, email, newPassword, confirmNewPassword } = updateUserDto;
//     const user = await this.usersRepository.findOne({ where: { id } });

//     user!.username = username ?? user!.username;
//     user!.email = email ?? user!.email;

//     if (newPassword && confirmNewPassword) {
//       if (!currentPassword) throw new BadRequestException("Current password is required");
//       const isPasswordMatch = await bcrypt.compare(currentPassword, user!.password);
//       if (!isPasswordMatch) throw new BadRequestException("Current password is incorrect");
//       if (newPassword !== confirmNewPassword) throw new BadRequestException("New passwords do not match");

//       const salt = await bcrypt.genSalt(10);
//       user!.password = await bcrypt.hash(newPassword, salt);
//     }

//     return this.usersRepository.save(user!);
//   }
//   /**
//       * Get current user (logged in user)
//       * @param id  id of the logged in user
//       * @returns the user from the database
//       */
//   public async getCurrentUser(id: number): Promise<User> {
//     const user = await this.usersRepository.findOne({ where: { id } });
//     if (!user) throw new NotFoundException("User not found");
//     return user;
//   }


//   public getAll(): Promise<User[]> {
//     return this.usersRepository.find();
//   }
//   /**
//       * generate Json web Token 
//       * @param payload JWT payload
//       * @returns token
//       */
//   private generateJWT(payload: JWTPayloadType): Promise<string> {
//     return this.jwtService.signAsync(payload);
//   }

//   private generateRefreshToken() {
//   return crypto.randomBytes(40).toString("hex");
// }


//   // public async forgotPassword(email: string): Promise<void> {
//   //   const user = await this.usersRepository.findOne({ where: { email } });
//   //   if (!user) throw new BadRequestException('Email not found');

//   //   // const resetToken = randomBytes(32).toString('hex');
//   //   // user.recovery_token = resetToken;
//   //   // user.recovery_sent_at = new Date();
//   //   // await this.usersRepository.save(user);
//   //   const randomNumber = Math.floor(1000 + Math.random() * 9000);

//   //   const transporter = nodemailer.createTransport({
//   //     host: "smtp.gmail.com", 
//   //     port: 465,
//   //     secure: true,
//   //     auth: {
//   //       user: "anamstafa101@gmail.com",    
//   //       pass: "wgoc xatp rlxu lyqj",       
//   //     },
//   //   });

//   //   // const resetLink = `https://yourapp.com/reset-password?token=${resetToken}`;

//   //   await transporter.sendMail({
//   //     from: '"PlantWise" <no-reply@plantwise.com>',
//   //     to: user.email,
//   //     subject: "Reset Your Password",
//   //     html: `
//   //       <p>Hello ${user.username},</p>
//   //       <p>Click The code to reset your password is ${randomNumber}</p>

//   //     `,
//   //   });

//   //   console.log(`Reset password email sent to ${user.email}`);
//   // }


//   // public async resetPasswordByToken(token: string, newPassword: string): Promise<void> {
//   //   const user = await this.usersRepository.findOne({ where: { recovery_token: token } });
//   //   if (!user) throw new BadRequestException('Invalid or expired token');

//   //   const sentAt = new Date(user.recovery_sent_at!).getTime();
//   //   const now = Date.now();
//   //   const MAX_AGE = 1000 * 60 * 60;

//   //   if (now - sentAt > MAX_AGE) {
//   //     user.recovery_token = null;
//   //     user.recovery_sent_at = null;
//   //     await this.usersRepository.save(user);
//   //     throw new BadRequestException('Token expired');
//   //   }

//   //   const salt = await bcrypt.genSalt(10);
//   //   user.password = await bcrypt.hash(newPassword, salt);

//   //   // user.recovery_token = null;
//   //   // user.recovery_sent_at = null;
//   //   await this.usersRepository.save(user);
//   // }
// }
// auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './users.schema';
import { RefreshToken, RefreshTokenDocument } from './refresh-token.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(RefreshToken.name) private refreshModel: Model<RefreshTokenDocument>,
    private jwtService: JwtService,
  ) {}

  async register(email: string, password: string) {
    const hashed = bcrypt.hashSync(password, 10);
    const user = await this.userModel.create({ email, password: hashed });
    return { id: user._id, email: user.email };
  }

  async login(email: string, password: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) throw new Error('Wrong email or password');
    const valid = bcrypt.compareSync(password, user.password);
    if (!valid) throw new Error('Wrong email or password');

    const accessToken = this.jwtService.sign({ id: user._id }, { expiresIn: '15m' });
    const refreshToken = this.jwtService.sign({ id: user._id }, { expiresIn: '7d' });

    await this.refreshModel.create({
      token: refreshToken,
      userId: user._id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });

    return { user: { id: user._id, email: user.email }, accessToken, refreshToken };
  }

  async logout(refreshToken: string) {
    await this.refreshModel.deleteOne({ token: refreshToken });
    return { message: 'Logged out successfully' };
  }

  async refresh(refreshToken: string) {
    const dbToken = await this.refreshModel.findOne({ token: refreshToken });
    if (!dbToken) throw new Error('Invalid refresh token');

    const payload = this.jwtService.verify(refreshToken);
    const newAccess = this.jwtService.sign({ id: payload.id }, { expiresIn: '15m' });
    return { accessToken: newAccess };
  }
}
