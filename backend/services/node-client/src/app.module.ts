import { Module } from '@nestjs/common';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { MetricsModule } from './shared/metrics/metrics.module';

@Module({
  imports: [
    PrometheusModule.register(),
    MetricsModule
  ],
})
export class AppModule {}
