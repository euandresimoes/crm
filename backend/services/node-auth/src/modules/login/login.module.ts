import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { PrismaClient } from 'generated/prisma';
import { JwtService } from 'src/shared/jwt/jwt.service';
import { MetricsModule } from 'src/shared/metrics/metrics.module';

@Module({
  imports: [
    MetricsModule
  ],
  providers: [
    LoginService,
    PrismaClient,
    JwtService
  ],
  controllers: [LoginController]
})
export class LoginModule { }
