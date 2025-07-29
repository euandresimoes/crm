import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { PrismaClient } from 'generated/prisma';
import { JwtService } from 'src/shared/jwt/jwt.service';

@Module({
  providers: [ProfileService, PrismaClient, JwtService],
  controllers: [ProfileController],
})
export class ProfileModule { }
