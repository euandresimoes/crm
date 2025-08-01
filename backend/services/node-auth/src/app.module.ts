import { Module } from '@nestjs/common';
import { CreateModule } from './modules/create/create.module';
import { LoginModule } from './modules/login/login.module';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { MetricsModule } from './shared/metrics/metrics.module';
import { ProfileModule } from './modules/profile/profile.module';
import { RedisModule } from './shared/redis/redis.module';

@Module({
  imports: [
    CreateModule,
    LoginModule,
    ProfileModule,
    PrometheusModule.register(),
    MetricsModule,
  ],
})
export class AppModule { }
