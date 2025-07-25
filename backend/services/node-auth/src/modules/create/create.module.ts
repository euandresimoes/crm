import { Module } from '@nestjs/common';
import { CreateController } from './create.controller';
import { CreateService } from './create.service';
import { PrismaClient } from 'generated/prisma';

@Module({
  providers: [CreateService, PrismaClient],
  controllers: [CreateController]
})
export class CreateModule { }
