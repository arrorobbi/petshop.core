import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from 'config/enum/role.enum';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles || roles.length === 0) {
      return false; // No roles required, allow access
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    let valid: boolean = false;

    Object.entries(UserRole).forEach(([key, value]) => {
      console.log(`${key}: ${value}`);
      if (value === roles[0]) {
        // Check if user has any of the required roles
        roles[0] === user.role ? (valid = true) : valid;
      }
      console.log(valid);

      return valid;
    });
  }
}
