import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { CURRENT_USER_KEY } from "src/utils/constants";
import { Reflector } from "@nestjs/core";
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthRolesGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly reflector: Reflector,
    private readonly userService: UsersService
  ) { }

  async canActivate(context: ExecutionContext) {
    const requireAdmin: boolean = this.reflector.getAllAndOverride<boolean>('isAdmin', [
      context.getHandler(),
      context.getClass(),
    ]);

    const request: Request = context.switchToHttp().getRequest();
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    const refreshToken = request.headers['x-refresh-token'] as string;

    if (!token || type !== "Bearer") {
      throw new UnauthorizedException("Access denied, no token provided");
    }

    let payload: any;
    try {

      payload = await this.jwtService.verifyAsync(token, {
        secret: 'aaa', // أو this.configService.get<string>("JWT_SECRET")
      });
      const response = context.switchToHttp().getResponse();
      response.setHeader('x-access-token', token);

    } catch (err) {

      if (!refreshToken) {
        throw new UnauthorizedException({
          error: "LOGOUT_REQUIRED",
          message: "Refresh token expired or invalid",
        });
      }

      try {

        const refreshData = await this.userService.refresh(refreshToken);


        payload = await this.jwtService.verifyAsync(refreshData.accessToken, {
          secret: 'aaa', // أو this.configService.get<string>("JWT_SECRET")
        });


        const response = context.switchToHttp().getResponse();
        response.setHeader('x-access-token', refreshData.accessToken);

      } catch (refreshErr) {

        throw new UnauthorizedException({
          error: "LOGOUT_REQUIRED",
          message: "Refresh token expired or invalid",
        });

      }
    }

    const user = await this.userService.getCurrentUser(payload.id);
    if (!user) {
      throw new UnauthorizedException("User not found");
    }

    if (requireAdmin && !user.isAdmin) {
      throw new UnauthorizedException("Access denied: Admins only.");
    }

    request[CURRENT_USER_KEY] = payload;
    return true;
  }
}



// const newAccessToken = response.headers.get('x-access-token');
// saveAccessToken(newAccessToken);
