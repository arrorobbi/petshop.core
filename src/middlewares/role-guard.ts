import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from 'config/enum/role.enum';

@Injectable()
export class RoleGuard implements CanActivate {
  // implementing using useGuard()
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // desicion for validating
    const roles = this.reflector.get<string[]>('roles', context.getHandler()); // get value from decoration
    if (!roles || roles.length === 0) {
      return false; // denied not declaring role
    }

    const request = context.switchToHttp().getRequest(); // get request
    const user = request.user; // get user from jwt

    let valid: boolean = false;

    // maping role input and validate to enum
    roles.map((value) =>
      user.role === UserRole[value] ? (valid = true) : valid,
    );
    return valid;
  }
}
