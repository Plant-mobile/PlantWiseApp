import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { CURRENT_USER_KEY } from "src/utils/constants";
import { Reflector } from "@nestjs/core";
import { UsersService } from "../users.service";

@Injectable()
export class AuthRolesGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly reflector: Reflector,
    private readonly userService: UsersService
  ) {}

  async canActivate(context: ExecutionContext) {
   
    const requireAdmin: boolean = this.reflector.getAllAndOverride<boolean>('isAdmin', [
      context.getHandler(),
      context.getClass(),
    ]);

    const request: Request = context.switchToHttp().getRequest();
    const [type, token] = request.headers.authorization?.split(" ") ?? [];

    if (token && type === "Bearer") {
      try {
        const payload = await this.jwtService.verifyAsync<{ id: number }>(
          token,
          {
            secret: this.configService.get<string>("JWT_SECRET"),
          }
        );

        const user = await this.userService.getCurrentUser(payload.id);
        if (!user) return false;

        // 🔹 تحقق من الدور (إذا طلب أدمن لازم يكون isAdmin = true)
        if (requireAdmin && !user.isAdmin) {
          throw new UnauthorizedException("Access denied: Admins only.");
        }

        request[CURRENT_USER_KEY] = payload;
        return true;

      } catch (error) {
        throw new UnauthorizedException("Access denied, invalid token");
      }
    } else {
      throw new UnauthorizedException("Access denied, no token provided");
    }
  }
}
