import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  //UnauthorizedException,
  //Inject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';
//import { Roles, ROLES_KEY } from '../decorators/roles.decorator';
//import { Role, RoleHierarchy } from '../types/role.type';
import { UserService } from 'src/users/user.service';
import { Role } from '../types/role.type';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticatedAndVerifiedGuard implements CanActivate {
  constructor(
    private readonly userService: UserService,
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  ROLES_KEY = 'roles';

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext();
    if (!ctx.req.headers.authorization) {
      return false;
    }
    const user = await this.validateToken(ctx.req.headers.authorization);

    ctx.req.user = user;

    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
      this.ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    const hasRole = requiredRoles.some((role) => user.roles?.includes(role));
    if (!hasRole) {
      return false;
    } else {
      return hasRole;
    }
  }

  async validateToken(authorizationToken: string) {
    if (authorizationToken.split(' ')[0] !== 'Bearer') {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    const token = authorizationToken.split(' ')[1];

    try {
      const decoded: any = jwt.verify(token, 'ABCDEFGHIJKL');
      const user = await this.userService.getUser(decoded.sub);
      if (!user) {
        throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
      }
      return user;
    } catch (err) {
      const message = 'Token error: ' + (err.message || err.name);
      throw new HttpException(message, HttpStatus.UNAUTHORIZED);
    }
  }
}
