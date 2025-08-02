import { collectDefaultMetrics } from './../node_modules/prom-client/index.d';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as client from 'prom-client';
import { registry } from './shared/metrics/metrics.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /*
   * Prometheus config 
   */
  const collectDefaultMetrics = client.collectDefaultMetrics;
  collectDefaultMetrics({ register: registry });

  /*
   * Swagger config 
   */
  const config = new DocumentBuilder()
    .setTitle('v1/client')
    .setVersion('v1')
    .build()

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, documentFactory);

  /*
   * Morgan config 
   */
  app.use(morgan('dev'));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
