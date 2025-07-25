import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { PrismaClient } from 'generated/prisma';
import { JwtService } from 'src/shared/services/jwt/jwt.service';

@Module({
  providers: [LoginService, PrismaClient, JwtService],
  controllers: [LoginController]
})
export class LoginModule { }
