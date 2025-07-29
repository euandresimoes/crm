import { Module } from '@nestjs/common';
import { CreateController } from './create.controller';
import { CreateService } from './create.service';
import { PrismaClient } from 'generated/prisma';
import { MetricsModule } from 'src/shared/metrics/metrics.module';

@Module({
  imports: [
    MetricsModule
  ],
  providers: [
    CreateService,
    PrismaClient,
  ],
  controllers: [CreateController]
})
export class CreateModule { }
