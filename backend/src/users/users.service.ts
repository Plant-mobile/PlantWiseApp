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
import { BadRequestException, Injectable, NotFoundException, Res, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from "./dtos/register.dto";
import { JWTPayloadType, LoginData, RegisterData } from "../utils/types";
import crypto from "crypto";
import { User } from './user.entity';
import { RefreshToken } from './refresh_token.entity';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as nodemailer from 'nodemailer';
import { PasswordResetCode } from './password-reset-code.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @InjectRepository(RefreshToken) private readonly refreshTokenRpository: Repository<RefreshToken>,
    @InjectRepository(PasswordResetCode) private readonly resetCodeRepository: Repository<PasswordResetCode>,
    private jwtService: JwtService,
  ) { }

  public async register(registerDto: RegisterDto): Promise<RegisterData> {
    const { email, password, userName } = registerDto;


    const userFromDb = await this.usersRepository.findOne({ where: { email } });
    if (userFromDb) throw new BadRequestException("User already exists");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    let newUser = this.usersRepository.create({
      email,
      userName,
      password: hashedPassword, 
    });
    newUser = await this.usersRepository.save(newUser);

    const refreshToken = this.generateRefreshToken();

    const refreshToken_db = await this.refreshTokenRpository.create({
      token: refreshToken,
      user: newUser,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });

    await this.refreshTokenRpository.save(refreshToken_db);

    const accessToken = await this.generateJWT({ id: newUser.id, email: newUser.email });
    return { user: { id: newUser.id, userName: newUser.userName, email: newUser.email, isAdmin: newUser.isAdmin }, accessToken, refreshToken };
  }

  async login(email: string, password: string): Promise<LoginData> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) throw new UnauthorizedException('Wrong email or password');
    const valid = bcrypt.compareSync(password, user.password);
    if (!valid) throw new UnauthorizedException('Wrong email or password');

    const accessToken = await this.generateJWT({ id: user.id, email: user.email });
    const refreshToken = this.generateRefreshToken();

    const refreshToken_db = await this.refreshTokenRpository.create({
      token: refreshToken,
      user: user,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });

    await this.refreshTokenRpository.save(refreshToken_db);

    const { password: _, ...safeUser } = user;

    return { user: safeUser, accessToken, refreshToken };

  }

  async logout(refreshToken: string) {
    await this.refreshTokenRpository.delete({ token: refreshToken });
    return { message: 'Logged out successfully' };
  }

  async refresh(refreshToken: string) {
    const dbToken = await this.refreshTokenRpository.findOne({
      where: { token: refreshToken },
      relations: ['user']
    });

    if (!dbToken) {
      throw new UnauthorizedException({
        error: "INVALID_REFRESH_TOKEN",
        message: "Invalid refresh token"
      });
    }

    if (dbToken.expiresAt < new Date()) {

      await this.refreshTokenRpository.delete({ token: refreshToken });

      throw new UnauthorizedException({
        error: "REFRESH_TOKEN_EXPIRED",
        message: "Refresh token expired, please login again"
      });
    }

    const newAccessToken = this.jwtService.sign(
      { id: dbToken.user.id, email: dbToken.user.email },
      { expiresIn: "15m" }
    );

    return {
      accessToken: newAccessToken,
      refreshToken: dbToken.token
    };
  }

  public async getCurrentUser(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException("User not found");
    return user;
  }

  public async forgotPassword(email: string): Promise<boolean> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) throw new BadRequestException('Email not found');

    const lastRequest = await this.resetCodeRepository.findOne({
      where: { user: { id: user.id } },
      order: { createdAt: 'DESC' }
    });

    const TWO_MINUTES = 2 * 60 * 1000; // 120,000 ms

    if (lastRequest) {
      const now = new Date();
      const last = new Date(lastRequest.createdAt);
      const diffMs = now.getTime() - last.getTime();

      if (diffMs < TWO_MINUTES) {
        const remainingMs = TWO_MINUTES - diffMs;
        const remainingSec = Math.floor(remainingMs / 1000);
        const minutes = Math.floor(remainingSec / 60);
        const seconds = remainingSec % 60;

        throw new BadRequestException(
          `You can request a new code after ${minutes}:${seconds
            .toString()
            .padStart(2, '0')} minutes`,
        );
      }
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const createdAt = new Date(Date.now()); // now
    const expiresAt = new Date(Date.now() + 2 * 60 * 1000); // 2 mins
    await this.resetCodeRepository.delete({ user: { id: user.id } });
    await this.resetCodeRepository.save({
      user,
      code,
      createdAt,
      expiresAt,
    });

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "anamstafa101@gmail.com",
        pass: "wgoc xatp rlxu lyqj",
      },
    });

    await transporter.sendMail({
      from: '"PlantWise" <no-reply@plantwise.com>',
      to: user.email,
      subject: "Reset Your Password",
      html: `
        <p>Hello ${user.userName},</p>
        <p>The code to reset your password is ${code}</p>
      `,
    });

    return true
  }

  async verifyResetCode(email: string, code: string): Promise<{ resetToken: string }> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) throw new BadRequestException('Email not found');

    const record = await this.resetCodeRepository.findOne({
      where: { user: { id: user.id }, code },
    });

    if (!record) throw new BadRequestException('Invalid code');
    if (record.expiresAt < new Date()) throw new BadRequestException('Code expired');

    const resetToken = this.jwtService.sign(
      { userId: user.id },
      { expiresIn: '2m' } // صالح 2 دقائق
    );

    return { resetToken };
  }

 async resetPassword(resetToken: string, newPassword: string): Promise<boolean> {

  let payload: any;
  try {
    payload = this.jwtService.verify(resetToken);
  } catch (e) {
    throw new BadRequestException('Invalid or expired token');
  }

  const user = await this.usersRepository.findOne({ where: { id: payload.userId } });
  if (!user) throw new BadRequestException('User not found');

  // Hash password
  const hashed = await bcrypt.hash(newPassword, 10);
  user.password = hashed;
  await this.usersRepository.save(user);

  // حذف أي كود باقٍ لهذا المستخدم
  await this.resetCodeRepository.delete({ user: { id: user.id } });

  return true;
}

























  private generateJWT(payload: JWTPayloadType): Promise<string> {
    return this.jwtService.signAsync(payload);
  }

  private generateRefreshToken() {
    return crypto.randomBytes(40).toString("hex");
  }
}
