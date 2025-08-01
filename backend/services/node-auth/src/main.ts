import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as morgan from 'morgan';
import * as client from 'prom-client';
import { registry } from './shared/metrics/metrics.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /*
   * Swagger config 
   */
  const collectDefaultMetrics = client.collectDefaultMetrics;
  collectDefaultMetrics({ register: registry });

  /*
   * Swagger config 
   */
  const config = new DocumentBuilder()
    .setTitle('v1/auth')
    .setVersion('v1')
    .build()
  
    const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, documentFactory);

  /*
   * Morgan config 
   */
  app.use(morgan('dev'));

  await app.listen(process.env.PORT ?? 7001);
}
bootstrap();
