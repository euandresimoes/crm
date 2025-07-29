import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { JwtService } from './jwt.service';

@Injectable()
export class JwtGuard implements CanActivate {

  constructor(
    private jwtService: JwtService
  ) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const req: Request = context.switchToHttp().getRequest();

    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new HttpException('Missing access token.', HttpStatus.FORBIDDEN);
    }

    try {
      const payload = this.jwtService.verifyAndReturnPayload(authHeader);

      req['user'] = {
        id: payload.sub
      };

      return true;
    } catch (err) {
      throw new HttpException('Invalid token.', HttpStatus.UNAUTHORIZED);
    }

  }
}
