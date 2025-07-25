import { Module } from '@nestjs/common';
import { MetricsModule } from './infra/metrics/metrics.module';
import { CreateModule } from './modules/create/create.module';
import { LoginModule } from './modules/login/login.module';

@Module({
  imports: [MetricsModule, CreateModule, LoginModule],
})
export class AppModule { }
